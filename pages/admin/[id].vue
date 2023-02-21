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

/**
 * Removes the leading [room] and the trailing dot from the event name
 * @param str event name
 */
function sanitizeEventName(str: string) {
  return str.replace(/^\[.*?]\s*/, '').replace(/\.$/, '')
}
</script>

<template>
  <div class="white-transparent-component absolute translate-x-1/2 w-[90%] right-1/2">
    Sei sulla pagina di appello del corso "{{ sanitizeEventName(event.name) }}".
    <div class="flex items-start p-2 mb-1 font-black pb-0 text-xl">
      <div class="w-full text-left">Nome</div>
      <div class="flex items-center ml-auto">
        Presente?
      </div>
    </div>
    <div v-for="(user, index) in users?.users" :key="index"
         class="flex items-center p-2 mb-1">
      <div class="w-full text-left">{{ capitalizeEachWord(user.user.name) || user.user.email }}</div>
      <div class="flex items-center ml-auto">
        <input :checked="user.user.checked" class="toggle toggle-success color-red" type="checkbox"
               @change="e => sendPresence(e, user)"/>
      </div>
    </div>
  </div>
</template>
