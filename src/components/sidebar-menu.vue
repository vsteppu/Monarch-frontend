<template>
        <div
            class="flex w-full font-thin text-2xl md:items-center justify-center"
        >
            <div
                @click="closeSidebar"
                class="flex flex-col md:flex-row md:items-center justify-end space-y-5 md:space-y-0 md:space-x-5"
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
                    :to="{ name: 'daily-exercises' }"
                    class="hover:text-violet-300"
                >
                    Daily Exercises
                </router-link>
                <router-link 
                    :to="{ name: 'running' }"
                    class="hover:text-violet-300"
                >
                    Running
                </router-link>
                <router-link 
                    :to="{ name: 'profile' }"
                    class="hover:text-violet-300"
                >
                    Profile
                </router-link>
                <div
                    @click="logout"
                    class="hover:text-violet-300"
                >
                    <ArrowRightStartOnRectangleIcon class="size-6 cursor-pointer"/>
                </div>
            </div>
        </div>
</template>
<script setup>
import { useAuthStore } from "@/stores/auth.store";

import { storeToRefs } from "pinia";
import { ArrowRightStartOnRectangleIcon } from '@heroicons/vue/24/outline';

const authStore = useAuthStore();
const { authenticated } = storeToRefs(authStore)

const emit = defineEmits(['closeSidebar'])

const logout = async () => {
    authStore.logoutUser()
    authenticated.value = false
}
const closeSidebar = async () => {
    emit('closeSidebar', false)
}
</script>