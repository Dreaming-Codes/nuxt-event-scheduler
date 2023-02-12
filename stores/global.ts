import {defineStore} from "pinia";

export const useGlobalStore = defineStore('global', {
    state: () => {
        return {
            events: [] as any[],
            subscribedEvents: [] as (number | null)[],
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
            const {data} = await useFetch("/api/events/slots", {
                query: {
                    round: round,
                }
            });

            if(!data.value){
                return;
            }

            data.value.forEach((slot: any) => {
                const event = this.events.find((event: any) => event.id === slot.eventId);
                if(!event){
                    return;
                }
                if(!event.availableSlots){
                    event.availableSlots = [];
                }
                event.availableSlots[slot.round] = event.maxUsers - slot._count;
            });
        },

        async fetchUserEvents(round: number | number[] | undefined = undefined) {
            const {data, pending} = await useFetch("/api/events/user", {
                query: {
                    round: round,
                }
            });

            if(pending.value){
                await new Promise((resolve)=>{
                    watch(pending, (value)=>{
                        if(!value){
                            resolve(null);
                        }
                    })
                })
            }

            if(!data.value){
                return;
            }

            data.value.forEach((round) => {
                this.subscribedEvents[round.round] = round.eventId;
            });
        },

        async sendRoundChoice(round: number): Promise<boolean> {
            console.log(this.subscribedEvents[round], round)
            try{
                await useFetch("/api/events/register", {
                    method: "POST",
                    body: {
                        round: round,
                        event_id: this.subscribedEvents[round]
                    }
                });
                return true;
            }catch (e){
                console.error(e)
                return false;
            }
        }
    }
})