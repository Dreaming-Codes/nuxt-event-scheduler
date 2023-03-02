<script lang="ts" setup>
import { useGlobalStore } from "~/stores/global";

import { capitalizeEachWord, fromEmailToName } from "~/utils";

const { data } = useSession();
const route = useRoute();
const globalStore = useGlobalStore();
const config = useAppConfig();

async function getUserInfoByEmail(email: string) {
    const rawData = await useFetch("/api/events/admin/getUserEventsFromEmail", {
        query: {
            email
        }
    });

    return rawData.data.value;
}

let email = route.params.username + "@itismeucci.com";

// Timetable of self
if (!route.params.username) {
    email = data.value?.user?.email as string;
}

const userInfo = await getUserInfoByEmail(email);

// Workaround when the user hasn't done any login
const name = // @ts-ignore
    userInfo.name == undefined
        ? fromEmailToName(email) // @ts-ignore
        : capitalizeEachWord(userInfo.name);
// @ts-ignore
const events = globalStore.getSubscribedEvents();
console.log(events);
</script>

<template>
    <div
        class="white-transparent-component absolute translate-x-1/2 w-[90%] right-1/2"
    >
        Sei sulla scansione oraria di
        {{ name }}
        ({{ userInfo.section }}-{{ userInfo.class }}).
        <div class="flex items-start p-2 mb-1 font-black pb-0 text-xl">
            <div class="w-full text-left">Lezione</div>
            <div class="flex items-center ml-auto">Presente?</div>
        </div>
        <template v-for="(event, i) in events" :key="i">
            <div>
                {{ config.DAYS[Math.floor(i / config.HOURS.length)] }}
                {{ config.HOURS[i % config.HOURS.length] }}
            </div>
        </template>
    </div>
</template>
