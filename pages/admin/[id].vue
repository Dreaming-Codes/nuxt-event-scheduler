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

if (!event.value) {
  throw new Error("No event was found");
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

function capitalizeEachWord(str: string) {
  return str.toLowerCase().split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" ");
}

// checkPresence() {}
</script>

<template>
  <div class="white-transparent-component absolute translate-x-1/2 w-[90%] right-1/2">
    <!-- TODO: Here we need to show the round day and hour -->
    Sei sulla pagina del corso {{ event.name }}.
    <div v-for="(user, index) in users?.users" :key="index"
         class="flex items-center p-2 mb-4">
      <!-- for some reason, capitalize property does not work -->
      <div class="w-full">{{ capitalizeEachWord(user.user.name) || user.user.email }}</div>
      <div class="flex items-center ml-auto">
        <input type="checkbox" class="toggle" :checked="user.user.checked"
               @change="e => sendPresence(e, user)"/>
      </div>
    </div>
  </div>
</template>
