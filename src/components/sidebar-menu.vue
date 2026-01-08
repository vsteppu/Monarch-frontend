<template>
        <div
            class="flex w-full font-thin text-2xl md:items-center md:justify-center"
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
                <div 
                    @click="showSecondMenu = !showSecondMenu"
                    class="relative cursor-pointer flex flex-col md:items-center"
                >
                    <div class="flex items-center space-x-1">
                        <span>Activity</span> 
                        <ChevronDownIcon class="size-4"/>
                    </div>
                    <div 
                        v-if="showSecondMenu" 
                        class="md:absolute bg-black p-3 space-y-3 md:pt-0 md:-left-3 md:top-11 flex flex-col ">
                        <router-link 
                            :to="{ name: 'daily-exercises' }"
                            class="hover:text-violet-300 whitespace-nowrap"
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
                            :to="{ name: 'workouts' }"
                            class="hover:text-violet-300"
                        >
                            Workouts
                        </router-link>
                    </div>
                </div>
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
                    <span>Logout</span>
                    <!-- <ArrowRightStartOnRectangleIcon class="size-6 cursor-pointer"/> -->
                </div>
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
import { useAuthStore } from "@/stores/auth.store";

import { storeToRefs } from "pinia";
import { ArrowRightStartOnRectangleIcon, ChevronDownIcon } from '@heroicons/vue/24/outline';
import { ref } from "vue";

const authStore = useAuthStore();
const { authenticated } = storeToRefs(authStore)

const emit = defineEmits(['closeSidebar'])

const showSecondMenu = ref(false)

const logout = async () => {
    authStore.logoutUser()
    authenticated.value = false
}
const closeSidebar = async () => {
    //emit('closeSidebar', false)
}
</script>