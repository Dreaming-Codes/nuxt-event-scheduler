<script lang="ts" setup>
import { useGlobalStore } from '~/stores/global';

const route = useRoute();
const globalStore = useGlobalStore();
const config = useAppConfig();

const eventID = globalStore.events.find(
  event => event.id === Number(route.params.id)
);

const event = eventID?.name;

const startDate = new Date(config.EVENT_DAY);
const startHour =
  startDate.getHours() +
  startDate.getMinutes() / 60 +
  startDate.getSeconds() / 3600;
let startDay = startDate.getDay() - 1;
if (startDay === -1) {
  startDay = 6;
} // Sunday is 6, not 0

const now = new Date('2023-02-30T11:40:30+0100');
const currentHour = now.getHours() + now.getMinutes() / 60 + now.getSeconds() / 3600;
let currentDay = now.getDay() - 1;
if (currentDay === -1) {
  currentDay = 6;
} // Again, sunday is 6, not 0

// Parse hours in config
const hours = [];
for (const i in config.HOURS) {
  const CompleteHour = config.HOURS[i].split(':');
  hours.push(Number(CompleteHour[0]) + Number(CompleteHour[1]) / 60);
}

// TODO: this code should be moved to the backend
if (currentHour - hours[0] < 0) {
  console.log('user is too early');
  // unauthorized()
}
if (currentHour - hours[hours.length - 1] > Number(config.HOURS_LENGTH)) {
  console.log('user is too late');
  // unauthorized()
}

const roundHour = hours.findIndex((hour) => {
  if (currentHour > hour && currentHour < hour + Number(config.HOURS_LENGTH)) {
    return true;
  } else {
    return false;
  }
});

const roundDay = currentDay - startDay;

const round = roundDayAndHourToRoundNumber(roundDay, roundHour);

console.log(round);

function roundDayAndHourToRoundNumber(day: number, hour: number) {
  const roundsInADay = config.HOURS.length;
  const cycleStart = day * roundsInADay;
  const cyclePosition = hour + 1;
  return cycleStart + cyclePosition;
}

// TODO: Here we need to query database to get the round name and the subscribed people to the round
</script>

<template>
  <div
    class="white-transparent-component absolute translate-x-1/2 w-[90%] right-1/2"
  >
    Sei sulla pagina del corso {{ event }}, lezione del giorno {{ config.DAYS[roundDay] }} alle {{ config.HOURS[roundHour] }}.
    <HeadlessTabGroup>
      <HeadlessTabList>
        <HeadlessTab />
      </HeadlessTabList>
    </HeadlessTabGroup>
  </div>
</template>
