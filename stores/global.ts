import {defineStore} from "pinia";
import {useFetch} from "#imports";

export const useGlobalStore = defineStore('global', {
    state: () => {
        return {
            events: [] as any[],
        }
    },
    actions: {
        async fetchEvents() {
            const { data, pending, error, refresh } = await useFetch("/api/events/list");
            // @ts-ignore
            this.events = data.value;
            const {data: availableSlots} = await useFetch("/api/events/availableSlots");
            if(!availableSlots.value){
                return;
            }
            availableSlots.value.forEach((slot: any) => {
                if(slot.round != 0){
                    return;
                }
                const event = this.events.find((event: any) => event.id === slot.eventId);
                if(!event){
                    return;
                }
                if(!event.availableSlots){
                    event.availableSlots = [];
                }
                event.availableSlots[slot.round] = event.maxUsers - slot._count;
            });
        }
    }
})