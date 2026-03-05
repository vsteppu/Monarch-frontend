<template>
    <div class="flex gap-1 items-center justify-center">
        <div
            v-if="loading"
            class="absolute top-1/2 left-1/2"
        >
            <Loading />
        </div>
        <div
            v-else
            class="w-full flex"
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
import { computed, ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";

import { useGalleryStore } from "@/stores/gallery.store";
import GalleryImageModal from '@/modals/gallery-image-modal.vue'
import Loading from '@/assets/icons/loading.vue'

import { XMarkIcon } from "@heroicons/vue/24/outline";

const router = useRouter();
const route = useRoute();
const galleryStore = useGalleryStore();
const { gallery, loading } = storeToRefs(galleryStore);

const image = ref(null);
const showImageModal = ref(false);

const folder = computed(() => {
    return gallery.value[route.query.folderId] || [];
});

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
    console.log('showImageModal.value: ', showImageModal.value);
}

const closeFolder = () => {
    router.push({ name: "gallery" });
}
</script>