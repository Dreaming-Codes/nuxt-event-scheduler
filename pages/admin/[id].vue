<script lang="ts" setup>
import {useGlobalStore} from '~/stores/global';
import {ArrElement} from "~/shared/types";

const route = useRoute();
const globalStore = useGlobalStore();
const config = useAppConfig();

const eventId = computed(() => Number(route.params.id))

const {data: users} = useFetch("/api/events/admin/users", {
  params: {
    eventId
  },
  watch: [eventId]
})

const event = computed(() => globalStore.events.find(
    event => event.id === eventId.value
));

if(!event.value) {
  throw new Error("Event not found");
}

function sendPresence(e: Event, user: ArrElement<NonNullable<typeof users.value>["users"]>) {
  useFetch("/api/events/admin/updateJoined", {
    method: "POST",
    body: {
      userId: user.user.id,
      present: (e.target as HTMLInputElement).checked
    }
  });
}

// checkPresence() {}
</script>

<template>
  <div
      class="white-transparent-component absolute translate-x-1/2 w-[90%] right-1/2"
  >
    <!-- TODO: Here we need to show the round day and hour -->
    Sei sulla pagina del corso {{ event.name }}.
    <div v-for="user in users?.users">
      {{ user.user.name }} <input type="checkbox" class="toggle" :checked="user.user.checked" @change="e => sendPresence(e, user)"/>
    </div>
  </div>
</template>