<script lang="ts" setup>
const props = defineProps<{
  name: string,
  description: string,
  availableSlots: number
}>();

const isOpen = ref(false);
</script>

<template>
  <div>
    <div class="main-transparency">
      <div class="flex place-content-between ">
        <p>{{ name.length > 30 ? name.slice(0, 29) + "…" : name }}</p>
        <button @click="isOpen = true">
          <Icon class="mb-1" name="mdi:information-outline"/>
        </button>
      </div>
      <div class="flex place-content-end">
        <p>{{ availableSlots }}</p>
        <Icon class="mt-1" name="mdi:account"/>
      </div>
    </div>

    <Dialog :description="description" :isOpen="isOpen" title="INFO" @close="isOpen = false">
      <div class="mt-4 flex place-content-center">
        <button
            class="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            type="button"
            @click="isOpen = false"
        >
          OK
        </button>
      </div>
    </Dialog>
  </div>
</template>

<style lang="scss" scoped>

</style>