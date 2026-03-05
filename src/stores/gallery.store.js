import { ref, onMounted, computed } from "vue";
import { defineStore } from "pinia";
import { getImagesAPI } from "@/api/gallery-api";
import { useNotificationStore } from "./notification.store";
import { useRoute } from "vue-router";

export const useGalleryStore = defineStore("gallery", () => {
    const route = useRoute();
    const notificationStore = useNotificationStore();
    const gallery = ref([]);
    const image = ref(null)
    const loading = ref(false)
    const loadedCount = ref(0)
    
    const folder = computed(() => {
        return gallery.value[route.query.folderId] || [];
    });


    const fetchGalleryHandler = async() => {
        try {
            gallery.value = await getImagesAPI();
            return gallery.value;
        } catch (error) {
            console.error('Error fetching gallery images:', error);
            notificationStore.notify("unable to fetch images. PLease try again later", 'error')
        }
    }

    const imageLoaded = (arrLength) => {
        loadedCount.value++
        if (loadedCount.value === arrLength) {
            loading.value = false
            loadedCount.value = 0
            return loading.value
        }
    }

    onMounted(async() => { await fetchGalleryHandler() });

    return {
        gallery,
        loadedCount,
        folder,
        loading,
        image,

        fetchGalleryHandler,
        imageLoaded,
    }
});