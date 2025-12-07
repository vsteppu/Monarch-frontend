<template>
    <div class="flex flex-col gap-2 rounded">
        <div class="flex justify-between items-center">
            <h1 class="text-2xl font-extralight">
                Login
            </h1>
            <logo class="size-6" />
        </div>
        <div>
            <h2 class="text-xl font-thin mb-1">
                Email
            </h2>
            <input
                type="text"
                v-model="email"
                placeholder="input your email"
                :class="regularInputs"
            />
        </div>
        <div>
            <h2 class="text-xl font-thin mb-1">
                Password
            </h2>
            <div class="flex items-center focus:shadow-stone-600 shadow-xl duration-900">
                <input
                    :type="!showPassword ? 'password' : 'text'"
                    v-model="password"
                    placeholder="input your password"
                    :class="regularInputs"
                />
                <div
                    @click="handleShowPassword"
                    class="px-2 border-b py-1"
                >
                    <EyeIcon 
                        v-if="!showPassword"
                        class="size-6 hover:text-violet-400"
                    />
                    <EyeSlashIcon
                        v-else
                        class="size-6 hover:text-violet-400"
                    />
                </div>
            </div>
        </div>
        <button
            @click="loginHandler()"
            :class="[
                ' hover:shadow-violet-800 hover:text-violet-400 shadow-lg duration-900 rounded mt-2 font-bold text-white flex items-center justify-center',
            ]"
        >
            <LoadingIcon 
                v-if="loading" 
                class="size-6 my-3"
            />
            <p v-else 
                class="my-3"
            >
                Login
            </p>
        </button>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { regularInputs } from "@/assets/inputs";

import { useAuthStore } from "@/stores/auth.store";
import { useNotificationStore } from "@/stores/notification.store";

import Logo from "@/assets/icons/logo.vue";
import LoadingIcon from '@/assets/icons/loading.vue'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';

const notificationStore = useNotificationStore();
const authStore = useAuthStore();
const { something, number, boolean, name, user, surname } = defineProps(['something', 'number', 'boolean', 'name', 'user', 'surname']);

const email = ref("vurado@gmail.com");
const password = ref("123456Aa.");
const loading = ref(false);
const showPassword = ref(false);

const handleShowPassword = () => {
    showPassword.value = !showPassword.value
}

const loginHandler = async () => {
    loading.value = true;
    try{
        const response = await authStore.loginUser({
            email: email.value,
            password: password.value
        })
        if(response.success) notificationStore.notify("Login was successful","success")
    } catch (err) {
        const data = err.response.data
        notificationStore.notify( data.message, "error")
        throw err
    } finally {
        loading.value = false
    }
};
</script>
