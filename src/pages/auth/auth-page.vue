<template>
    <div class="w-full h-screen flex justify-center">
        <div 
            :class="['w-80 p-4 my-auto flex flex-col gap-2 rounded']"
        >
            <Transition
                mode="out-in" 
                enter-active-class="transition-opacity duration-500"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-opacity duration-500"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
            >
            <!-- mode="out-in" make sure to completely remove login component and then mount register -->
                <Login 
                    v-if="authPage == 'login'"
                    :something="'strange'"
                    :number="8"
                    :boolean="true"
                    v-bind="obj"
                />
                <Register
                    v-else-if="authPage == 'register'"
                />
            </Transition>
            <button
                @click="moveToOtherAuthPage"
                class="m-3 hover:text-violet-300 font-thin"
            >
                {{ authPage == 'login' ? "Go to REGISTER" : "Go to LOGIN" }}
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Login from './login.vue'
import Register from './register.vue'

import { useNotificationStore } from '@/stores/notification.store';

const notificationStore = useNotificationStore()


const authPage = ref('login');

const obj = {
    user: '007',
    name: 'James',
    surname: 'Bond'
}

const moveToOtherAuthPage = () => {
    if (authPage.value == 'login') {
        authPage.value = 'register'
    } else {
        authPage.value = 'login'
    }
};
</script>
