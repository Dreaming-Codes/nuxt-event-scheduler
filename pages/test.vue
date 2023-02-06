<script setup lang="ts">
interface Event {
  name: string,
  description: string,
  availableSlots: number
}

const selectedDay = ref(0);

const events: Event[][] = []

for(let j = 0; j < 3; j++) {
  events[j] = [];
  for (let i = 0; i < 20; i++) {
    events[j].push({
      name: `name of an activity from ${j} day`,
      description: "description",
      availableSlots: 3
    })
  }
}

const isOpen = ref(false)

function closeModal() {
  isOpen.value = false
}

function openModal() {
  isOpen.value = true
}

</script>

<template>
  <div class="white-transparent-component absolute translate-x-1/2 w-[90%] right-1/2">
    Attività {{selectedDay }}

    <div class="mt-10 h-[70vh]">
      <div class="max-h-[85%] max-[290px]:max-h-[73%] min-[376px]:max-h-[90%] overflow-auto ">
        <Event v-for="event in events[selectedDay]" :availableSlots="event.availableSlots" class="my-4" :description="event.description" :name="event.name"/>
      </div>
      <div class="mt-4 flex flex-row place-content-between">
        <button class="white-transparent-component transition-colors absent-button" @click="openModal">Sono Assente</button>
        <div class="mr-4">
          <button class="white-transparent-component back-button transition-colors" @click="selectedDay--" :disabled="selectedDay <= 0">Indietro</button>
          <button class="white-transparent-component next-button transition-colors ml-2" @click="selectedDay++" :disabled="selectedDay >= events.length - 1">Avanti</button>
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