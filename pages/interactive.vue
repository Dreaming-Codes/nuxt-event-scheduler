<script setup lang="ts">
import {useGlobalStore} from "~/stores/global";

definePageMeta({  middleware: ["interactive-done"]})

const globalStore = useGlobalStore();
const config = useAppConfig()
const router = useRouter();

const selectedRound = ref(globalStore.subscribedEvents.length);

const isOpen = ref(false)
const isFullOpen = ref(false)

if(!globalStore.subscribedEvents[selectedRound.value]){
  globalStore.subscribedEvents[selectedRound.value] = null;
}

function prevRound() {
  selectedRound.value--;
  if(!globalStore.subscribedEvents[selectedRound.value]){
    globalStore.subscribedEvents[selectedRound.value] = null;
  }
  globalStore.fetchCounts(selectedRound.value);
}

//TODO: Add animation
async function nextRound() {
  let success = await globalStore.sendRoundChoice(selectedRound.value);
  if(!success){
    globalStore.subscribedEvents[selectedRound.value] = null;
    globalStore.fetchCounts(selectedRound.value);
    isFullOpen.value = true
    return;
  }
  if(selectedRound.value > (config.DAYS.length - 1) * 2){
    await useFetch("/api/events/done", {
      method: 'POST'
    });
    await useSession().signIn(undefined, {callbackUrl: "/"})
    return;
  }
  selectedRound.value++;
  if(!globalStore.subscribedEvents[selectedRound.value]){
    globalStore.subscribedEvents[selectedRound.value] = null;
  }
  globalStore.fetchCounts(selectedRound.value);
}

</script>

<template>
  <div class="white-transparent-component absolute translate-x-1/2 w-[90%] right-1/2">
    Scegli la attività per <b>{{ config.DAYS[Math.floor(selectedRound / 2)] }}</b> alle <b>{{ config.HOURS[selectedRound % 2] }}</b>

    <div class="mt-10 h-[70vh]">
      <div class="max-h-[85%] max-[290px]:max-h-[73%] min-[376px]:max-h-[90%] overflow-auto">
        <HeadlessRadioGroup v-model="globalStore.subscribedEvents[selectedRound]">
          <HeadlessRadioGroupOption
              v-for="event in globalStore.events.filter(event =>
              globalStore.subscribedEvents[selectedRound] == event.id
              || (event.availableSlots && event.availableSlots[selectedRound] != null
              ? event.availableSlots[selectedRound]
              : event.maxUsers)
              > 0)"
              :value="event.id"
              :key="event.id"
              v-slot="{ checked }"
          >
            <Event
                :availableSlots="event.availableSlots && event.availableSlots[selectedRound] != null  ? event.availableSlots[selectedRound] : event.maxUsers"
                class="my-4"
                :description="event.description"
                :name="event.name"
                :checked="checked"
            />

          </HeadlessRadioGroupOption>
        </HeadlessRadioGroup>
      </div>
      <div class="mt-4 flex flex-row place-content-between">
        <button class="white-transparent-component transition-colors absent-button" @click="isOpen = true">Sono Assente</button>
        <div class="mr-4">
          <button class="white-transparent-component back-button transition-colors" @click="prevRound" :disabled="selectedRound <= 0">Indietro</button>
          <button class="white-transparent-component next-button transition-colors ml-2" @click="nextRound" :disabled="!globalStore.subscribedEvents[selectedRound]">Avanti</button>
        </div>

      </div>

    </div>
  </div>
  <Dialog :isOpen="isOpen" title="SICURO DI VOLER MANCARE?" description="Se manchi, ti verrà applicata un'assenza sul registro" @close="isOpen = false">
    <div class="mt-4 flex place-content-between">
      <button
          class="white-transparent-component absent-button"
          type="button"
          @click="isOpen = false; globalStore.subscribedEvents[selectedRound] = null; nextRound()"
      >
        Si, mi assenterò
      </button>
      <button
          class="white-transparent-component next-button"
          type="button"
          @click="isOpen = false"
      >
        No, ci sarò
      </button>
    </div>
  </Dialog>
  <Dialog :isOpen="isFullOpen" title="L'EVENTO È PIENO" description="Scegli un altro evento" @close="isFullOpen = false">
    <div class="mt-4 flex place-content-center">
        <button
            class="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-20"
            type="button"
            @click="isFullOpen = false"
        >
          OK
        </button>
      </div>
  </Dialog>
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