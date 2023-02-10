import {defineStore} from "pinia";

export const useGlobalStore = defineStore('global', {
    state: () => {
        return {
            events: [] as any[],
        }
    },
    actions: {
        async fetchEvents() {
            const {data} = await useFetch("/api/events/list");

            if(!data.value){
                return;
            }

            this.events = data.value;
        },

        async fetchCounts(round: number | undefined = undefined) {
            const {data: availableSlots} = await useFetch("/api/events/slots", {
                query: {
                    round: round,
                }
            });

            if(!availableSlots.value){
                return;
            }

            availableSlots.value.forEach((slot: any) => {
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