<script lang="ts" setup>
import {useGlobalStore} from '~/stores/global';

const route = useRoute();
const globalStore = useGlobalStore();
const config = useAppConfig();

const eventId = computed(() => Number(route.params.id))

const {data: users} = useFetch("/api/events/admin/users", {
  params: {
    eventId
  },
  default: ()=>{
    return {
      users: [],
      round: 0
    }
  },
  watch: [eventId]
})

const event = computed(() => globalStore.events.find(
    event => event.id === eventId.value
));

// TODO: Here we need to query api to get the round name and the subscribed people to the round
// eventID need to be sent
</script>

<template>
  <div
      class="white-transparent-component absolute translate-x-1/2 w-[90%] right-1/2"
  >
    <!-- TODO: Here we need to show the round day and hour -->
    Sei sulla pagina del corso {{ event.name }}.
    <div v-for="user in users.users">
      {{ user.user.name }}
    </div>
  </div>
</template>