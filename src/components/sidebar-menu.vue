<template>
        <div
            class="flex w-full font-light text-2xl md:items-center md:justify-center"
        >
            <div
                @click="closeSidebar"
                class="flex flex-col text-white md:text-black md:flex-row md:items-center justify-end space-y-5 md:space-y-0 md:space-x-5"
            >
                <router-link 
                    :to="{ name: 'home' }"
                    class="hover:text-violet-300"
                >
                    Home
                </router-link>
                <router-link 
                    :to="{ name: 'gallery' }"
                    class="hover:text-violet-300"
                >
                    Gallery
                </router-link>
                <div
                    v-if="authenticated && isRequestDesignProjectEnabled()"
                    @click="toggleSecondMenu"
                    class="relative cursor-pointer flex flex-col md:items-center"
                    ref="toggle"
                >
                    <div class="flex items-center space-x-1">
                        <span>Activity</span> 
                        <ChevronDownIcon class="size-4"/>
                    </div>
                    <div 
                        v-if="showSecondMenu" 
                        class="md:absolute bg-white p-3 space-y-3 md:pt-0 md:-left-3 md:top-11 flex flex-col ">
                        <router-link 
                            :to="{ name: 'daily-exercises' }"
                            class="hover:text-red-800 whitespace-nowrap"
                        >
                            Daily Exercises
                        </router-link>
                        <router-link 
                            :to="{ name: 'running' }"
                            class="hover:text-violet-300"
                        >
                            Running
                        </router-link>
                    </div>
                </div>
                <router-link 
                    :to="{ name: 'request-project' }"
                    class="hover:text-violet-300 whitespace-nowrap"
                >
                    Request Project
                </router-link>
                <router-link 
                    :to="{ name: 'profile' }"
                    class="hover:text-violet-300"
                >
                    Profile
                </router-link>
                <!-- <div
                    @click="logout"
                    class="hover:text-violet-300"
                >
                    <span>Logout</span>
                    <ArrowRightStartOnRectangleIcon class="size-6 cursor-pointer"/>
                </div> -->
            </div>
            <!-- <Teleport to="body">
                <div v-if="showSecondMenu" class="absolute top-12 w-full h-96 bg-amber-700">
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
                </div>
            </Teleport> -->
        </div>
</template>
<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth.store";
import { onClickOutside } from "@vueuse/core";
import { isRequestDesignProjectEnabled } from "@/helpers";

import { ChevronDownIcon } from '@heroicons/vue/24/outline';

const authStore = useAuthStore();
const { authenticated } = storeToRefs(authStore)

const emit = defineEmits(['closeSidebar'])

const showSecondMenu = ref(false)
const toggle = ref(null)

const logout = async () => {
    authStore.logoutUser()
    authenticated.value = false
}

const closeSidebar = async () => {
    //emit('closeSidebar', false)
}

const toggleSecondMenu = () => {
    showSecondMenu.value = !showSecondMenu.value
}

onClickOutside(toggle, () => showSecondMenu.value = false)
</script>