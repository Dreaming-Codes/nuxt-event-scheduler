<script lang="ts" setup>
defineProps<{
    name: string;
    description: string;
    availableSlots: number;
    checked: boolean;
}>();

const isOpen = ref(false);
</script>

<template>
    <div>
        <div
            class="white-transparent-component hover:bg-white/[0.2] transition-colors"
            :class="checked ? '!bg-green-500/[0.9]' : ''"
        >
            <div class="flex place-content-between">
                <p class="text-white">
                    {{ name.length > 30 ? name.slice(0, 29) + "…" : name }}
                </p>
                <button @click="isOpen = true">
                    <Icon class="mb-1" name="mdi:information-outline" />
                </button>
            </div>
            <div class="flex place-content-end">
                <p>{{ availableSlots }}</p>
                <Icon class="mt-1" name="mdi:account" />
            </div>
        </div>

        <Dialog
            :description="description"
            :is-open="Boolean(isOpen)"
            title="INFO"
            @close="isOpen = false"
        >
            <div class="mt-4 flex place-content-center">
                <button
                    class="rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-20"
                    type="button"
                    @click="isOpen = false"
                >
                    OK
                </button>
            </div>
        </Dialog>
    </div>
</template>
