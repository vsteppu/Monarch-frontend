<template>
    <div 
        v-if="authenticated"
        :class="[
            isMobile ? 'px-8' : 'px-20',
            'w-full fixed py-3 flex justify-between'
        ]"
    >
        <router-link 
            :to="{ name: 'home' }"
        >
            <span
                class="hidden md:block font-extrabold text-2xl"
            >
                MONARCH
            </span>
            <Logo
                class="size-7 md:hidden"
            />
        </router-link>
        <div
            v-if="!isMobile"
            class="font-thin text-2xl flex items-center gap-10"
        >
            <router-link 
                :to="{ name: 'home' }"
                class="hover:text-violet-300"
            >
                Home
            </router-link>
            <router-link 
                :to="{ name: 'progress' }"
                class="hover:text-violet-300"
            >
                Progress
            </router-link>
            <router-link 
                :to="{ name: 'workouts' }"
                class="hover:text-violet-300"
            >
                Workouts
            </router-link>
            <router-link 
                :to="{ name: 'running' }"
                class="hover:text-violet-300"
            >
                Running
            </router-link>
            <button
                @click="logout"
                class="hover:text-violet-300"
            >
                <ArrowRightStartOnRectangleIcon class="size-6 cursor-pointer"/>
            </button>
        </div>
        <div v-else-if="isMobile">
            <FadeEffect>
                <XMarkIcon
                    v-if="show"
                    @click="show = !show"
                    class="size-6 cursor-pointer"
                />
                <Bars2Icon
                    v-else
                    @click="show = !show"
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

const authStore = useAuthStore();
const { isMobile } = useIsMobile();
const { authenticated } = storeToRefs(authStore)
const show = ref(false)


const logout = async () => {
    authStore.logoutUser()
    authenticated.value = false
}
</script>