<script setup lang="ts">

const dateToCountDown = new Date('2023-02-20T00:00:00+0100');

const secondsTillOpen = ref(Math.floor((dateToCountDown.getTime() - new Date().getTime()) / 1000));

setTimeout(() => {
  secondsTillOpen.value--;

  setInterval(() => {
    secondsTillOpen.value--;
  }, 1000);
}, 1000 - new Date().getMilliseconds());

const days = computed(() => {
  return Math.floor(secondsTillOpen.value / 86400);
});

const hours = computed(() => {
  return Math.floor((secondsTillOpen.value % 86400) / 3600);
});

const minutes = computed(() => {
  return Math.floor((secondsTillOpen.value % 3600) / 60);
});

const seconds = computed(() => {
  return Math.floor(secondsTillOpen.value % 60);
});
</script>
<template>
  <!-- ChatGPT FTW -->
  <div class="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center">
    <div class="grid grid-flow-col gap-5 text-center auto-cols-max">
      <div class="flex flex-col">
        <span class="countdown font-mono text-[22vmin]">
          <span :style="`--value:${days}`" />
        </span>
        Giorni
      </div>
      <div class="flex flex-col">
        <span class="countdown font-mono text-[18vmin]">
          <span :style="`--value:${hours}`" />
        </span>
        Ore
      </div>
      <div class="flex flex-col">
        <span class="countdown font-mono text-[14vmin]">
          <span :style="`--value:${minutes}`" />
        </span>
        Minuti
      </div>
      <div class="flex flex-col">
        <span class="countdown font-mono text-[10vmin]">
          <span :style="`--value:${seconds}`" />
        </span>
        Secondi
      </div>
    </div>
  </div>
</template>
