<script lang="ts" setup>
const categories = ref({
  LUNEDÌ: [
    {
      id: 1,
      title:'Lorem ipsum dolor sit amet',
      date: '08:00',
      subs: 23,
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet",
      date: '08:30',
      subs: 150,
    },
  ],
  MARTEDÌ: [
    {
      id: 1,
      title:'Lorem ipsum dolor sit amet',
      date: '08:00',
      subs: 23,
    }
  ],
  MERCOLEDÌ: [
    {
      id: 1,
      title:'Lorem ipsum dolor sit amet',
      date: '08:00',
      subs: 23,
    },
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet",
      date: '08:30',
      subs: 150,
    },
  ],
})

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
              v-for="category in Object.keys(categories)"
              :key="category"
              v-slot="{ selected }"
              as="template"
          >
            <button
                :class="[
              'w-full rounded-lg py-9 text-sm font-medium leading-5 text-blue-100',
              'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none',
              selected
                ? 'bg-white/[0.16] shadow'
                : 'hover:bg-white/[0.07] hover:text-white',
            ]"
            >
              {{ category }}
            </button>
          </HeadlessTab>
        </HeadlessTabList>

        <HeadlessTabPanels class="mt-2">
          <TransitionScale group :duration="500">
            <HeadlessTabPanel
                v-for="(posts, idx) in Object.values(categories)"
                :key="idx"
                :class="[
            'rounded-xl bg-white/[0.07] p-3',
            'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 backdrop-blur focus:outline-none focus:ring-2',
          ]"
            >
              <ul>
                <li
                    v-for="post in posts"
                    :key="post.id"
                    class="relative rounded-md p-3 hover:bg-white/[0.1]"
                    @click="openModal"
                >
                  <h3 class="text-sm font-medium leading-5">
                    {{ post.title }}
                  </h3>

                  <ul
                      class="mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500"
                  >
                    <li>{{ post.date }}</li>
                    <li>&middot;</li>
                    <li>{{ post.subs }} iscritti</li>
                  </ul>

                  <a
                      :class="[
                  'absolute inset-0 rounded-md',
                  'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2',
                ]"
                      href="#"
                  />
                </li>
              </ul>
            </HeadlessTabPanel>

          </TransitionScale>
        </HeadlessTabPanels>
      </HeadlessTabGroup>
      <HeadlessTransitionRoot appear :show="isOpen">
        <HeadlessDialog @close="closeModal" class="relative z-10">
          <HeadlessTransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100"
              leave-to="opacity-0"
          >
            <div class="fixed inset-0 bg-black bg-opacity-25" />
          </HeadlessTransitionChild>

          <div class="fixed inset-0 overflow-y-auto">
            <div
                class="flex min-h-full items-center justify-center p-4 text-center"
            >
              <HeadlessTransitionChild
                  enter="duration-300 ease-out"
                  enter-from="scale-[20%]"
                  enter-to="scale-100"
                  leave="duration-200 ease-in"
                  leave-from="scale-50"
                  leave-to="scale-[20%]"
              >
                <HeadlessDialogPanel
                    class="w-full max-w-md transform overflow-hidden rounded-2xl bg-blue-900/[0.3] backdrop-blur p-6 text-left align-middle shadow-xl transition-all"
                >
                  <HeadlessDialogTitle
                      as="h3"
                      class="text-lg font-medium leading-6 text-white text-center"
                  >
                    LOGIN NECESSARIO
                  </HeadlessDialogTitle>
                  <div class="mt-2">
                    <p class="text-sm text-gray-400">
                      Prima di potersi inscrivere a delle attività è necessario effettuare il login.
                    </p>
                  </div>

                  <div class="mt-4 flex place-content-center">
                    <button
                        type="button"
                        class="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        @click="closeModal"
                    >
                      LOGIN
                    </button>
                  </div>
                </HeadlessDialogPanel>
              </HeadlessTransitionChild>
            </div>
          </div>
        </HeadlessDialog>
      </HeadlessTransitionRoot>
    </div>
  </div>
</template>