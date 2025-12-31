import { ref, watch } from "vue";
import { defineStore } from "pinia";
import { loginAPI, registerAPI } from "@/api/auth-api";
import { useAuthState } from "@/composables/auth";
import { useGoogleToken } from "@/stores/recaptcha.js";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore('authStore',()=>{
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

    const userParameters = async() => {
        const response = await getParametersAPI({ email, password, token });
        console.log('response: ', response);
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