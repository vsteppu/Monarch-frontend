<template>
    <div
        v-if="loading"
        class="absolute top-1/2 left-1/2"
    >
        <Loading />
    </div>

    <div
        v-else
        class="flex flex-wrap gap-2 items-center justify-center"
    >
        <div
            v-for="(folder, key) in gallery"
            :key="key"
            class=""
        >
            <div
                @click="openFolder(key)"
                class="cursor-pointer"
            >
                <img
                    :src="folder[0].url"
                    alt=""
                    class="h-60"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter, useRoute } from "vue-router";

import { useGalleryStore } from "@/stores/gallery.store";

import GalleryFolder from "@/components/gallery-folder.vue";
import Loading from "@/assets/icons/loading.vue";

const router = useRouter();
const route = useRoute();
const galleryStore = useGalleryStore();
const { gallery } = storeToRefs(galleryStore);

const displayFolder = ref("none");

const loading = computed(
    () => !gallery.value || Object.keys(gallery.value).length === 0
);

const openFolder = (key) => {
    displayFolder.value = gallery.value[key];
    router.push({ name: "gallery.folder", query: { folderId: key } });
};

//onMounted(async () => {
//    await galleryStore.fetchGalleryHandler();
//});
</script>