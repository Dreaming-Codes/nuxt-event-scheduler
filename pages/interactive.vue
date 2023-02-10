<script setup lang="ts">
import {useGlobalStore} from "~/stores/global";

const globalStore = useGlobalStore();
const config = useAppConfig()

const selectedRound = ref(0);

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}

function openModal() {
  isOpen.value = true
}

function prevRound() {
  selectedRound.value--
  globalStore.fetchCounts(selectedRound.value);
}

function nextRound() {
  selectedRound.value++
  globalStore.fetchCounts(selectedRound.value);
}

</script>

<template>
  <div class="white-transparent-component absolute translate-x-1/2 w-[90%] right-1/2">
    Scegli la attività per {{ config.DAYS[Math.floor(selectedRound / 2)] }} alle {{ config.HOURS[selectedRound % 2] }}

    <div class="mt-10 h-[70vh]">
      <div class="max-h-[85%] max-[290px]:max-h-[73%] min-[376px]:max-h-[90%] overflow-auto ">
        <Event v-for="event in globalStore.events" :availableSlots="event.availableSlots && event.availableSlots[selectedRound]  ? event.availableSlots[selectedRound] : event.maxUsers" class="my-4" :description="event.description" :name="event.name"/>
      </div>
      <div class="mt-4 flex flex-row place-content-between">
        <button class="white-transparent-component transition-colors absent-button" @click="openModal">Sono Assente</button>
        <div class="mr-4">
          <button class="white-transparent-component back-button transition-colors" @click="prevRound" :disabled="selectedRound <= 0">Indietro</button>
          <button class="white-transparent-component next-button transition-colors ml-2" @click="nextRound" :disabled="selectedRound > (config.DAYS.length - 1) * 2">Avanti</button>
        </div>

      </div>

    </div>
  </div>
  <Dialog :isOpen="isOpen" title="SICURO DI VOLER MANCARE?" description="Se manchi, ti verrà applicata un'assenza sul registro" @close="isOpen = false">
    <div class="mt-4 flex place-content-between">
      <button
          class="white-transparent-component absent-button"
          type="button"
          @click="isOpen = false"
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