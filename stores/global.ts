import {defineStore} from "pinia";

export const useGlobalStore = defineStore('global', {
    state: () => {
        return {
            events: [] as any[],
        }
    },
    actions: {
        async fetchEvents() {
            const list = useFetch("/api/events/list");
            const slots = useFetch("/api/events/slots");

            const [{data}, {data: availableSlots}] = await Promise.all([list, slots]);

            if(!data.value || !availableSlots.value){
                return;
            }

            this.events = data.value;

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