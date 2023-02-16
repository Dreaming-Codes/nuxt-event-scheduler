<script setup lang="ts">
import { useRouter } from '#app';
import { useGlobalStore } from '~/stores/global';
import { sleep } from '~/utils';

const globalStore = useGlobalStore();
const config = useAppConfig();
const router = useRouter();

const {
  data,
  getSession
} = useSession();

const selectedRound = ref(globalStore.subscribedEvents.length <= (((config.DAYS.length - 1) * config.HOURS.length) + 1) ? globalStore.subscribedEvents.length : 0);

const showAbsenceDialog = ref(false);
const showEventFullDialog = ref(false);
const showEndPhaseDialog = ref(false);
const isLoadingNext = ref(false);
const isLoadingPrev = ref(false);

if (!globalStore.subscribedEvents[selectedRound.value]) {
  globalStore.subscribedEvents[selectedRound.value] = null;
}

async function prevRound() {
  isLoadingPrev.value = true;
  await globalStore.fetchCounts(selectedRound.value);
  selectedRound.value--;
  if (!globalStore.subscribedEvents[selectedRound.value]) {
    globalStore.subscribedEvents[selectedRound.value] = null;
  }
  isLoadingPrev.value = false;
}

async function nextRound() {
  isLoadingNext.value = true;
  const success = await globalStore.sendRoundChoice(selectedRound.value);
  if (!success) {
    globalStore.subscribedEvents[selectedRound.value] = null;
    await globalStore.fetchCounts(selectedRound.value);
    showEventFullDialog.value = true;
    isLoadingNext.value = false;
    return;
  }
  if (selectedRound.value > (config.DAYS.length - 1) * 2) {
    await useFetch('/api/events/done', {
      method: 'POST'
    });
    showEndPhaseDialog.value = true;
    await sleep(2420);
    await getSession({ required: true });
    router.push('/');
    return;
  }
  await globalStore.fetchCounts(selectedRound.value - 1);
  selectedRound.value++;
  if (!globalStore.subscribedEvents[selectedRound.value]) {
    globalStore.subscribedEvents[selectedRound.value] = null;
  }
  isLoadingNext.value = false;
}
</script>

<template>
  <div>
    <div class="white-transparent-component absolute translate-x-1/2 w-[90%] right-1/2">
      Scegli la attività per <b>{{ config.DAYS[Math.floor(selectedRound / 2)] }}</b> alle <b>{{ config.HOURS[selectedRound % 2] }}</b>

      <div class="mt-10 h-[70vh]">
        <TransitionScale
          easing="cubicBezier(0.3, 0.001, 0.2, 1)"
          mode="out-in"
        >
          <div
            :key="selectedRound"
            class="max-h-[85%] max-[290px]:max-h-[73%] min-[376px]:max-h-[90%] overflow-auto"
          >
            <HeadlessRadioGroup v-model="globalStore.subscribedEvents[selectedRound]">
              <HeadlessRadioGroupOption
                v-for="event in globalStore.events.filter(event =>
                  data?.user?.section >= event.minimumSection
                  && (globalStore.subscribedEvents[selectedRound] == event.id
                    || (event.availableSlots && event.availableSlots[selectedRound] != null
                      ? event.availableSlots[selectedRound]
                      : event.maxUsers)
                      > 0))"
                :key="event.id"
                v-slot="{ checked }"
                :value="event.id"
              >
                <Event
                  :available-slots="event.availableSlots && event.availableSlots[selectedRound] != null ? event.availableSlots[selectedRound] : event.maxUsers"
                  class="my-4"
                  :description="event.description"
                  :name="event.name"
                  :checked="checked"
                />
              </HeadlessRadioGroupOption>
            </HeadlessRadioGroup>
          </div>
        </TransitionScale>
        <div class="mt-4 flex flex-row place-content-between">
          <button
            class="white-transparent-component transition-colors absent-button"
            @click="showAbsenceDialog = true"
          >
            Sono Assente
          </button>
          <div class="mr-4">
            <button
              class="white-transparent-component back-button transition-colors"
              :disabled="selectedRound <= 0 || (isLoadingPrev || isLoadingNext)"
              @click="prevRound"
            >
              <Icon
                v-if="isLoadingPrev"
                class="mb-1"
                name="svg-spinners:eclipse"
              />
              <span v-else>Indietro</span>
            </button>
            <button
              class="white-transparent-component next-button transition-colors ml-2"
              :disabled="!globalStore.subscribedEvents[selectedRound] || (isLoadingNext || isLoadingPrev)"
              @click="nextRound"
            >
              <Icon
                v-if="isLoadingNext"
                class="mb-1"
                name="svg-spinners:eclipse"
              />
              <span v-else>Avanti</span>
            </button>
          </div>
        </div>
      </div>
    </div>
    <Dialog
      :is-open="showAbsenceDialog"
      title="SICURO DI VOLER MANCARE?"
      description="Se manchi, ti verrà applicata un'assenza sul registro"
      @close="showAbsenceDialog = false"
    >
      <div class="mt-4 flex place-content-between">
        <button
          class="white-transparent-component absent-button"
          type="button"
          @click="showAbsenceDialog = false; globalStore.subscribedEvents[selectedRound] = null; nextRound()"
        >
          Si, mi assenterò
        </button>
        <button
          class="white-transparent-component next-button"
          type="button"
          @click="showAbsenceDialog = false"
        >
          No, ci sarò
        </button>
      </div>
    </Dialog>
    <Dialog
      :is-open="showEventFullDialog"
      title="L'EVENTO È PIENO"
      description="Scegli un altro evento"
      @close="showEventFullDialog = false"
    >
      <div class="mt-4 flex place-content-center">
        <button
          class="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-20"
          type="button"
          @click="showEventFullDialog = false"
        >
          OK
        </button>
      </div>
    </Dialog>

    <Dialog
      :is-open="showEndPhaseDialog"
      title="Fatto!"
      description="Sarai reindirizzato alla lista dei corsi"
    />
  </div>
</template>

<style lang="scss" scoped>
.next-button{
  @apply bg-emerald-900 hover:bg-emerald-800 disabled:bg-gray-500/[0.5];
}
.back-button{
  @apply bg-sky-900 hover:bg-sky-800 disabled:bg-gray-500/[0.5];
}

.absent-button{
  @apply bg-red-900 hover:bg-red-800 disabled:bg-gray-500/[0.5];
}
</style>
