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

function getRoundUsers(eventID: number): string[] {

}

const users = getRoundUsers(eventID);
</script>

<template>
  <div
    class="white-transparent-component absolute translate-x-1/2 w-[90%] right-1/2"
  >
    <!-- TODO: Here we need to show the round day and hour -->
    Sei sulla pagina del corso {{ event }}.
    <HeadlessTabGroup>
      <HeadlessTabList>
        <HeadlessTab v-for="user in users" :key="user.id">
          {{ user.name }}
        </HeadlessTab>
      </HeadlessTabList>
    </HeadlessTabGroup>
  </div>
</template>
