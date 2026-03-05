<template>
    <Teleport 
        to="body"
        v-if="image"
        @closeModal="closeImage"
    >
        <div class="flex fixed bottom-0 h-[calc(100%-56px)] z-10 items-center justify-between w-full">
            <ChevronLeftIcon 
                class="cursor-pointer absolute min-w-20 size-20 text-white opacity-50 hover:opacity-100"
                @click="prevImage"
            />
            <img 
                :src="image" 
                class="mx-auto h-full max-w-fit"
            />
            <ChevronRightIcon
                class="cursor-pointer absolute right-0 min-w-20 size-20 text-white opacity-50 hover:opacity-100"
                @click="nextImage"
            />
            <XMarkIcon
                class="cursor-pointer absolute top-5 right-5 size-10 text-white opacity-50 hover:opacity-100"
                @click="closeImage"
            />
        </div>
        <div class="h-screen w-full bg-black opacity-80 fixed top-0 z-0"/>  
    </Teleport>
</template>

<script setup>
import { ChevronRightIcon, ChevronLeftIcon, XMarkIcon } from "@heroicons/vue/24/outline";
import { onMounted, onUnmounted } from 'vue'

const emit = defineEmits(['closeModal', 'nextImage', 'prevImage'])

const image = defineModel();

const closeImage = () => {
    emit('closeModal');
}

const nextImage = () => {
    emit('nextImage');
}

const prevImage = () => {
    emit('prevImage');
}

const onKeydown = (e) => {
    if (!image) return;
    if (e.key === 'ArrowLeft') {
        prevImage();
    }
    if (e.key === 'ArrowRight') {
        nextImage();
    }
    if (e.key === 'Escape') {
        closeImage();
    }
}

onMounted(() => {
    window.addEventListener('keydown', onKeydown);
});

onUnmounted(() => {
    window.removeEventListener('keydown', onKeydown);
});
</script>