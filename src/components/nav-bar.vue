<template>
    <div 
        v-if="authenticated"
        :class="[
            'w-full fixed py-3 flex justify-between px-4 md:px-20'
        ]"
    >
        <router-link 
            :to="{ name: 'home' }"
        >
            <span
                class="font-extrabold text-2xl"
            >
                MONARCH
            </span>
        </router-link>
        <SidebarMenu class="hidden md:block"/>
        <div class="md:hidden">
            <FadeEffect>
                <Bars2Icon
                    @click="displaySidebar"
                    class="size-6 cursor-pointer"
                />
            </FadeEffect>
        </div>
    </div>
    <Sidebar 
        v-if="showSidebar"
        v-model="showSidebar"
        class="md:hidden"
    />
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/auth.store";

import { storeToRefs } from "pinia";
import FadeEffect from '@/effects/fade-effect.vue'
import { useIsMobile } from "@/composables/is-mobile.js";
import Logo from '@/assets/icons/logo.vue'
import { Bars2Icon, XMarkIcon } from '@heroicons/vue/24/outline';
import SidebarMenu from './sidebar-menu.vue'
import Sidebar from './sidebar.vue'

const authStore = useAuthStore();
const { isMobile } = useIsMobile();
const { authenticated } = storeToRefs(authStore)
const showSidebar = ref(false)

const displaySidebar = () => {
    showSidebar.value = !showSidebar.value
}
</script>