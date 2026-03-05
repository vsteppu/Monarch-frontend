<template>
    <div class="flex gap-1 items-center justify-center">
        <div
            v-if="loading"
            class="absolute top-1/2 left-1/2"
        >
            <Loading />
        </div>
        <div
            class="w-full"
            :class="loading ? 'hidden' : 'flex'"
        >
            <div
                class="bg-white/85 flex gap-1 flex-wrap items-center justify-center"
            >
                <div 
                    v-for="value in folder"
                >
                    <img 
                        :src="value.url"
                        alt=""
                        class="max-h-60"
                        @click="openImage(value.url)"
                        @load="imageSetLoaded"
                    >
                </div>
            </div>
            <XMarkIcon
                @click="closeFolder"
                class="fixed size-10 bg-white right-5 top-16"
            />
        </div>
    </div>
    <GalleryImageModal
        v-if="showImageModal"
        v-model="image"
        @closeModal="closeImage"
        @nextImage="nextImage"
        @prevImage="prevImage"
    />
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";

import { useGalleryStore } from "@/stores/gallery.store";
import GalleryImageModal from '@/modals/gallery-image-modal.vue'
import Loading from '@/assets/icons/loading.vue'

import { XMarkIcon } from "@heroicons/vue/24/outline";

const router = useRouter();
const route = useRoute();
const galleryStore = useGalleryStore();
const { folder, loading, image } = storeToRefs(galleryStore);

const showImageModal = ref(false);

const openImage = (url) => {
    image.value = url;
    showImageModal.value = true;
}

const nextImage = () => {
    const index = folder.value.findIndex(img => img.url === image.value) + 1
    if (folder.value[index]) {
        image.value = folder.value[index].url
    } else {
        image.value = folder.value[0].url
    }
}

const prevImage = () => {
    const index = folder.value.findIndex(img => img.url === image.value) - 1
    if (folder.value[index]) {
        image.value = folder.value[index].url
    } else {
        image.value = folder.value.at(-1).url
    }
    
}

const closeImage = () => {
    showImageModal.value = false;
}

const closeFolder = () => {
    router.push({ name: "gallery" });
}

const imageSetLoaded = () => {
    galleryStore.imageLoaded(folder.value.length)
}

onMounted(() => { loading.value = true })
</script>