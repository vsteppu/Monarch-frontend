import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { loginAPI, registerAPI, getParametersAPI } from "@/api/auth-api";
import { useAuthState } from "@/composables/auth";
import { useGoogleToken } from "@/stores/recaptcha.js";
import { useRouter } from "vue-router";
import { useNotificationStore } from "./notification.store";

export const useAuthStore = defineStore('authStore',()=>{
    const notificationStore = useNotificationStore()
    const googleToken = useGoogleToken()
    const router = useRouter()
    const { getUser, isAuthenticated } = useAuthState()

    const user = ref(getUser() || null)
    const authenticated = ref(isAuthenticated() || false)

    const registerUser = async (data) => {
        const token = await googleToken.getToken();
        const { name, email, password } = data

        const response = await registerAPI({ name, email, password, token });

        if (response.success) {
            authenticated.value = true
            user.value = response?.user
            router.push({ path: "/" })
        }
        return response;
    }

    const loginUser = async (data) => {
        try{
            const token = await googleToken.getToken();
            const { email, password } = data

            const response = await loginAPI({ email, password, token });

            if (response.success) {
                authenticated.value = true
                user.value = response?.user
                router.push({ path: "/" })
            }
            return response;
        } catch (err) {
            throw err
        }
    }

    const userParameters = async(id) => {
        try {
            return await getParametersAPI(id);
        } catch (err) {
            const data = err.response.data
            notificationStore.notify( data.message, "error")
            throw err
        }
    }

    const logoutUser = () => {
        localStorage.removeItem('user')
        router.push({name: 'auth-page'})
    }

    return {
        user,
        authenticated,

        loginUser,
        registerUser,
        userParameters,
        logoutUser,
    };
})