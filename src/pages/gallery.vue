<template>
    <div class="flex gap-1 items-center justify-center">
        <div
            v-for="(folder, key) in gallery"
            class=""
        >
            <div
                v-if="showFolder === 'none'"
                @click="openFolder(key)"
                class="cursor-pointer"
            >
                <img 
                    :src="folder[0].url"
                    alt=""
                    class="h-60"
                >
            </div>
            <div class="w-full flex">
                <div
                    v-if="showFolder === key"
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
                    v-if="showFolder === key"
                    @click="closeFolder()"
                    class="size-10 cursor-pointer fixed right-10 top-20 bg-white"
                />
            </div>
        </div>
    </div>
    <Modal
        v-if="image"
        @closeModal="closeImage"
    >
        <template #content>
            <div class="flex">
                <img 
                    :src="image" 
                    alt=""
                    class="mx-auto" 
                />
            </div>
        </template>
    </Modal>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useGalleryStore } from "@/stores/gallery.store";
import { XMarkIcon } from "@heroicons/vue/24/outline";
import Modal from '@/components/modal.vue'

const galleryStore = useGalleryStore();
const { gallery } = storeToRefs(galleryStore);

const showFolder = ref('none');
const image = ref(null);

const openFolder = (folder) => {
    showFolder.value = folder;
}

const openImage = (url) => {
    image.value = url;
}

const closeImage = () => {
    image.value = null;
}

const closeFolder = () => {
    showFolder.value = 'none';
}
</script>