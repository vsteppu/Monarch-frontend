<template>
    <Teleport to="body">
        <div class="fixed top-0 h-full flex justify-center items-center w-full z-10 ">
            <div 
                :class="[
                    'p-1 flex flex-col justify-center items-center m-32 bg-white'
                ]"
            >
                <div class="relative">
                    <div
                        @click="closeModal"
                        class="cursor-pointer absolute top-3 right-3 justify-end flex" 
                    >
                        <XMarkIcon class="size-8 bg-white"/>
                    </div>
                    <div :class="[
                        'flex max-h-[80vh] mx-auto'
                    ]">
                        <slot name="content"/>
                    </div>
                </div>
            </div>
        </div>
        <div class="fixed top-0 h-full flex w-full bg-black opacity-40"/>
    </Teleport>
</template>

<script setup>
import { XMarkIcon } from "@heroicons/vue/24/outline";

const emit = defineEmits(['closeModal'])
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
        default: 'bg-white'
    },
    contentTextColor: {
        type: String,
        default: 'text-stone-300'
    },
})

const closeModal = () => {
    emit('closeModal', false)
}
</script>