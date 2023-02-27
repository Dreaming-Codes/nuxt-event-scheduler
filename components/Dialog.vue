<script setup lang="ts">
defineProps<{
    isOpen: boolean;
    title: string;
    description: string;
}>();

// eslint-disable-next-line func-call-spacing
const emit = defineEmits<{
    (e: "close"): void;
}>();
</script>

<template>
    <HeadlessTransitionRoot :show="isOpen" appear>
        <HeadlessDialog class="relative z-10" @close="emit('close')">
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
                                {{ title }}
                            </HeadlessDialogTitle>
                            <div class="mt-2">
                                <p class="text-sm text-gray-400">
                                    {{ description }}
                                </p>
                            </div>

                            <slot />
                        </HeadlessDialogPanel>
                    </HeadlessTransitionChild>
                </div>
            </div>
        </HeadlessDialog>
    </HeadlessTransitionRoot>
</template>
