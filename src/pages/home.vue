<template>
    <header
        v-if="headImage"
        class="w-full h-dvh flex justify-end items-center relative"
    >
        <img
            :src="headImage"
            class="h-4/5 w-3/5 z-0 object-cover"
        />
        <div
            class="absolute top-2/5 left-9 md:left-20 z-0 font-light"
        >
            <div
                class="flex flex-col w-2/3 gap-3"
            >
                <span
                    class="text-4xl font-bold font-bbh"
                >
                    Contemporary Design with Loft Accents
                </span>
                <p class="bg-white">
                    <span
                        class="font-bold"
                    >
                        A project developed in collaboration with AB + Partners in Chișinău,
                        Divus Restaurant blends raw materials, warm lighting, and minimalist details to create an elegant and intimate atmosphere.
                    </span>
                </p>
            </div>
            <div
                class="absolute gap-4 text-black font-extrabold mt-6 flex p-1 items-center"
            >
                <router-link
                    :to="{ path: '/gallery-folder', query: { folderId: '004' } }"
                >
                    <div
                        class="opacity-100 bg-orange-200 text-black font-extrabold p-2 whitespace-nowrap"
                    >
                        Go to Project
                    </div>
                </router-link>
            </div>
        </div>
    </header>
    <div 
        v-else-if="!headImage"
        class="flex items-center justify-center w-full h-screen"
    >
        <Loading />
    </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import { useGalleryStore } from "@/stores/gallery.store";
import { storeToRefs } from "pinia";
import Loading from "@/assets/icons/loading.vue";

const galleryStore = useGalleryStore()
const { gallery, loading } = storeToRefs(galleryStore)

const headImage = computed(() => gallery.value['004']?.[0]?.url)
</script>
