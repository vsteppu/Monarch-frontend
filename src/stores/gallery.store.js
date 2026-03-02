import { ref, onMounted } from "vue";
import { defineStore } from "pinia";
import { getImagesAPI } from "@/api/gallery-api";
import { useNotificationStore } from "./notification.store";

export const useGalleryStore = defineStore("gallery", () => {
    const notificationStore = useNotificationStore();
    const gallery = ref([]);

    const fetchGalleryHandler = async() => {
        try {
            gallery.value = await getImagesAPI();
        } catch (error) {
            console.error('Error fetching gallery images:', error);
            notificationStore.notify("unable to fetch images. PLease try again later", 'error')
        }
    }

    onMounted(async() => {
        console.log('bvjhvjv');
        await fetchGalleryHandler();
    });

    return {
        gallery,
    }
});