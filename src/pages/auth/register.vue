<template>
        <div class="my-auto flex flex-col gap-2 rounded">
            <div class="flex justify-between items-center">
                <h1 class="text-2xl font-semibold">
                    Register
                </h1>
                <logo class="size-6" />
            </div>
            <div>
                <h2 class="text-xl font-thin mb-1">
                    Name
                </h2>
                <input
                    type="text"
                    v-model="name"
                    placeholder="Your name"
                    :class="regularInputs"
                />
            </div>
            <div>
                <h2 class="text-xl font-thin mb-1">
                    Email
                </h2>
                <input
                    type="text"
                    v-model="email"
                    placeholder="Your email"
                    :class="regularInputs"
                />
            </div>
            <div>
                <h2 class="text-xl font-thin mb-1">
                    Password
                </h2>
                <div class="flex items-center">
                    <input
                        :type="!showPassword ? 'password' : 'text'"
                        v-model="password"
                        placeholder="Your password"
                        :class="regularInputs"
                    />
                    <EyeIcon 
                        v-if="!showPassword"
                        @click="handleShowPassword"
                        class="size-6 hover:text-red-600"
                    />
                    <EyeSlashIcon
                        v-else
                        @click="handleShowPassword"
                        class="size-6 hover:text-green-600"
                    />
                </div>
            </div>
            <div>
                <h2 class="text-xl font-thin mb-1">
                    Confirm Password
                </h2>
                <div class="flex items-center">
                    <input
                        :type="!showConfirmPassword ? 'password' : 'text'"
                        v-model="confirmPassword"
                        placeholder="Your password"
                        :class="[regularInputs, 'mr-3']"
                    />
                    <EyeIcon 
                        v-if="!showConfirmPassword"
                        @click="handleShowConfirmPassword"
                        class="size-6 hover:text-red-600"
                    />
                    <EyeSlashIcon
                        v-else
                        @click="handleShowConfirmPassword"
                        class="size-6 hover:text-green-600"
                    />
                </div>
            </div>
            <button
                @click="registerHandler()"
                class="hover:shadow-violet-800 shadow-xl duration-900 rounded mt-2 font-bold text-white flex items-center justify-center"
            >
                <LoadingIcon 
                    v-if="loading" 
                    class="size-6 my-3"
                />
                <p 
                    v-else 
                    class="my-3"
                >
                    Register
                </p>
            </button>
            <span class="font-light text-sm text-center mx-auto">
                By creating an account, you agree to our Terms of Use
                and Privacy Policy.
            </span>
        </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { registerAPI } from "@/api/auth-api";
import { useAuthStore } from "@/stores/auth.store";
import { regularInputs } from "@/assets/inputs";

import Logo from "@/assets/icons/logo.vue";
import { useGoogleToken } from "@/stores/recaptcha.js";
import LoadingIcon from '@/assets/icons/loading.vue'
import { useNotificationStore } from "@/stores/notification.store";
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline';

const router = useRouter();
const googleToken = useGoogleToken();
const authStore = useAuthStore();
const notificationStore = useNotificationStore();

const name = ref("Vlad");
const email = ref("vurado@gmail.com");
const password = ref("123456Aa.");
const confirmPassword = ref("123456Aa.");
const loading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const handleShowPassword = () => {
    showPassword.value = !showPassword.value
}

const handleShowConfirmPassword = () => {
    showConfirmPassword.value = !showConfirmPassword.value
}

const registerHandler = async () => {
    loading.value = true;
    try {
        if (password.value !== confirmPassword.value) {
            console.error({message: `Passwords don't match`});
            return;
        }

        const response = await authStore.registerUser({
            name: name.value,
            email: email.value,
            password: password.value,
        });
        
        if (response.success) {
            notificationStore.notify('Register was successful', 'success')
        }
        return response;
    } catch (err) {
        const data = err.response.data
        notificationStore.notify(data.message, 'error')
        console.error("error: ", err);
        loading.value = false;
    } finally {
        loading.value = false;
    }
};
</script>
