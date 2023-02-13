<script lang="ts" setup>
import {useGlobalStore} from "~/stores/global";
import {useRouter} from "#app";

const globalStore = useGlobalStore();

const config = useAppConfig()
const router = useRouter();

const selected = ref(0);

const isOpen = ref(false)
function closeModal() {
  isOpen.value = false
}

function openModal() {
  isOpen.value = true
}
</script>

<template>
  <div>
    <div class="my-[3vh] md:my-40 mx-4 md:mx-20">
      <HeadlessTabGroup>
        <HeadlessTabList class="flex space-x-1 rounded-xl bg-blue-900/20 p-1 backdrop-blur">
          <HeadlessTab
              v-for="(_, index) in config.DAYS.length * config.HOURS.length"
              :key="index"
              @click="selected = index"
              v-slot="{ selected }"
              as="template"
          >
            <button
                class="tabButton transition-colors"
                :class="selected ? 'bg-white/[0.16] shadow': 'hover:bg-white/[0.07]'"
            >
              {{ config.DAYS[Math.floor(index / config.HOURS.length)] }} {{ config.HOURS[index % config.HOURS.length] }}
            </button>
          </HeadlessTab>
        </HeadlessTabList>

        <HeadlessTabPanels class="mt-2">
          <TransitionScale :duration="500" group>
            <HeadlessTabPanel
                v-for="(_, index) in config.DAYS.length * config.HOURS.length"
                :key="index"
                class="rounded-xl bg-white/[0.07] p-3 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 backdrop-blur"
            >
              <ul>
                <li
                    v-for="post in globalStore.events"
                    :key="post.id"
                    :class="globalStore.subscribedEvents[selected] === post.id ? '!bg-green-500/[0.9] !text-black' : ''"
                    class="relative rounded-md p-3 hover:bg-white/[0.1] transition-colors"
                    @click="openModal"
                >
                  <h3 class="text-sm font-medium leading-5">
                    {{ post.name }}
                  </h3>

                  <ul
                      class="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500"
                  >
                    <li>{{post.availableSlots && post.availableSlots[selected] != null ? post.availableSlots[selected] : post.maxUsers}}/{{post.maxUsers}} iscritti</li>
                  </ul>
                </li>
              </ul>
            </HeadlessTabPanel>

          </TransitionScale>
        </HeadlessTabPanels>
      </HeadlessTabGroup>
      <Dialog :isOpen="isOpen" title="Modifica la tua registrazione" description="Sarai rendirizzato alla pagina interattiva per la registrazione" @close="isOpen = false">
        <div class="mt-4 flex place-content-center">
          <button
              class="white-transparent-component"
              type="button"
              @click="router.push('/interactive')"
          >
            OKAY
          </button>
        </div>
      </Dialog>
    </div>
  </div>
</template>

<style lang="scss">
.tabButton {
  @apply w-full rounded-lg py-9 text-[60%] sm:text-xl font-medium leading-5 text-blue-100 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400;
}
</style>