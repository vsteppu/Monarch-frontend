<template>
    <div 
        v-if="authenticated && !showSidebar"
        :class="[
            'w-full h-14 fixed py-3 flex justify-between items-center px-4 md:px-20 z-100'
        ]"
    >
        <router-link 
            :to="{ name: 'home' }"
        >
            <span
                class="font-extrabold hidden md:block text-2xl"
            >
                MONARCH
            </span>
            <Logo 
                class="size-10 md:hidden"
            />
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
        class="md:hidden w-full"
    />
</template>
<script setup>
import { ref, watch } from "vue";
import { useAuthStore } from "@/stores/auth.store";

import { storeToRefs } from "pinia";
import FadeEffect from '@/effects/fade-effect.vue'
import Logo from '@/assets/icons/logo.vue'
import { Bars2Icon } from '@heroicons/vue/24/outline';
import SidebarMenu from './sidebar-menu.vue'
import Sidebar from './sidebar.vue'
import { useRoute } from "vue-router";

const route = useRoute();
const authStore = useAuthStore();
const { authenticated } = storeToRefs(authStore)
const showSidebar = ref(false)

const displaySidebar = () => {
    showSidebar.value = !showSidebar.value
}

watch(() => route.path,() => showSidebar.value = false)
</script>