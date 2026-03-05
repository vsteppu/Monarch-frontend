<template>
    <div
        v-if="loading"
        class="absolute top-1/2 left-1/2"
    >
        <Loading />
    </div>

    <div
        class="flex-wrap gap-2 items-center justify-center"
        :class="loading ? 'hidden' : 'flex'"
    >
        <div
            v-for="(folder, key) in gallery"
            :key="key"
            :class="loading ? 'hidden' : ''"
        >
            <div
                @click="openFolder(key)"
                class="cursor-pointer"
            >
                <img
                    :src="folder[0].url"
                    alt=""
                    class="h-60"
                    @load="imageSetLoaded"
                />
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useGalleryStore } from "@/stores/gallery.store";
import Loading from "@/assets/icons/loading.vue";

const router = useRouter();
const galleryStore = useGalleryStore();
const { gallery, loading } = storeToRefs(galleryStore);

const openFolder = (key) => {
    router.push({ name: "gallery.folder", query: { folderId: key } });
};

const imageSetLoaded = () => {
    const keys = Object.keys(gallery.value).length
    galleryStore.imageLoaded(keys)
}

onMounted(() => { 
    loading.value = true
})
</script>