<script lang="ts" setup>
const config = useAppConfig();

const dateToCountDown = new Date(config.COUNTDOWN_DAY);

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
  <div class="absolute translate-x-1/2 right-1/2 translate-y-1/2 bottom-1/2">
    <div class="grid grid-flow-col gap-5 text-center auto-cols-max">
      <div class="flex flex-col">
        <span class="countdown font-mono text-[22vmin]">
          <span :style="`--value:${days}`"/>
        </span>
        Giorni
      </div>
      <div class="flex flex-col">
        <span class="countdown font-mono text-[18vmin]">
          <span :style="`--value:${hours}`"/>
        </span>
        Ore
      </div>
      <div class="flex flex-col">
        <span class="countdown font-mono text-[14vmin]">
          <span :style="`--value:${minutes}`"/>
        </span>
        Minuti
      </div>
      <div class="flex flex-col">
        <span class="countdown font-mono text-[10vmin]">
          <span :style="`--value:${seconds}`"/>
        </span>
        Secondi
      </div>
    </div>
  </div>
</template>
