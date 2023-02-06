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
  <div class="main-transparency absolute translate-x-1/2 w-[70%] right-1/2">
    Ciao
  <div class="mt-10 h-[70vh]">
    <div class="max-h-[100%] overflow-auto">
      <Event v-for="_ in 20" name="name" description="description" :availableSlots="3" class="my-4"/>
    </div>
  </div>
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