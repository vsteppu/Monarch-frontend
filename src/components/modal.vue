<template>
    <Teleport to="body">
        <div class="fixed top-0 h-full flex justify-center items-center w-full z-10 ">
            <div 
                :class="[
                    containerHeight,
                    containerWidth,
                    containerColor,
                    'p-6 flex flex-col'
                ]"
            >
                <div class="w-full flex items-center justify-between text-2xl font-bold mb-4">
                    <slot name="header"/>
                    <div
                        @click="closeModal"
                        class="cursor-pointer" 
                    >
                        <XMarkIcon class="size-8"/>
                    </div>
                </div>
                <div :class="[

                    'w-full flex grow text-xl text-stone-300 font-thin'
                ]">
                    <slot name="content"/>
                </div>
                <div class="w-full text-xl text-stone-300 font-thin">
                    <slot name="actions"/>
                </div>
            </div>
        </div>
        <div class="fixed top-0 h-full flex w-full bg-black opacity-40"/>
    </Teleport>
</template>

<script setup>
import { XMarkIcon } from "@heroicons/vue/24/outline";

const emit = defineEmits(['closeRunningModal'])
const props = defineProps({
    containerHeight: {
        type: String,
        default: 'h-[600px]'
    },
    containerWidth: {
        type: String,
        default: 'w-[800px]'
    },
    containerColor: {
        type: String,
        default: 'bg-black'
    },
    contentTextColor: {
        type: String,
        default: 'text-stone-300'
    },
})

const closeModal = () => {
    emit('closeRunningModal', false)
}
</script>