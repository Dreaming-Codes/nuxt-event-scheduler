<script lang="ts" setup>
import { useGlobalStore } from '~/stores/global';

const route = useRoute();
const globalStore = useGlobalStore();
const config = useAppConfig();

const eventID = globalStore.events.find(
  event => event.id === Number(route.params.id)
);

const event = eventID?.name;

// TODO: Here we need to query api to get the round name and the subscribed people to the round
// eventID need to be sent

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
