<script lang="ts" setup>
import {useGlobalStore} from '~/stores/global';
import {getCurrentRoundSafe} from "~/shared/utils";

const route = useRoute();
const globalStore = useGlobalStore();
const config = useAppConfig();

const eventId = computed(() => Number(route.params.id))

const {data: users} = useFetch("/api/events/admin/users", {
  params: {
    eventId
  },
  default: () => {
    return {
      users: [],
      round: getCurrentRoundSafe(config.EVENT_DAY, config.HOURS, config.HOURS_LENGTH)
    }
  },
  watch: [eventId]
})

const event = computed(() => globalStore.events.find(
    event => event.id === eventId.value
));
console.log(users.value?.users)
</script>

<template>
  <div
      class="white-transparent-component absolute translate-x-1/2 w-[90%] right-1/2"
  >
    <!-- TODO: Here we need to show the round day and hour -->
    Sei sulla pagina del corso {{ event.name }}.
    <div v-for="user in users.users">
      {{ user.user.name }} <input type="checkbox" class="toggle" />
    </div>
  </div>
</template>