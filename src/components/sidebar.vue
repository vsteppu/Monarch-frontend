<template>
    <div 
        class="w-full h-full px-4 fixed py-3 flex justify-between bg-black z-50"
    >
        <div>
            <router-link 
                :to="{ name: 'home' }"
            >
                <span
                    class="font-extrabold text-2xl"
                >
                    MONARCH
                </span>
            </router-link>
            <SidebarMenu 
                @close-sidebar="closeSidebar"
                class="mt-5"
            />
        </div>
        <div>
            <FadeEffect>
                <XMarkIcon
                    @click="closeSidebar"
                    class="size-6 cursor-pointer"
                />
            </FadeEffect>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth.store";

import { storeToRefs } from "pinia";
import FadeEffect from '@/effects/fade-effect.vue'
import { useIsMobile } from "@/composables/is-mobile.js";
import Logo from '@/assets/icons/logo.vue'
import { ArrowRightStartOnRectangleIcon, Bars2Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import SidebarMenu from './sidebar-menu.vue'

const authStore = useAuthStore();
const { isMobile } = useIsMobile();
const { authenticated } = storeToRefs(authStore)
const showSidebar = defineModel()

const closeSidebar = () => {
    showSidebar.value = !showSidebar.value
}
</script>