import { getUserAPI } from "@/api/auth-api"
import { ref } from "vue"

export const useAuthState = () => {
    const error = ref(null)
    
    const setUserId = (id) => {
        const data = {id, isAuthenticated: true}
        localStorage.setItem('userId', JSON.stringify(data))
    }

    const getUserId = () => {
            const userStatus = JSON.parse(localStorage.getItem('userId'))
            return userStatus.id
    }


    const isAuthenticated = () => {
        const response = JSON.parse(localStorage.getItem('userId'))
        return response?.isAuthenticated ?? false
    }

    return {
        setUserId,
        getUserId,
        isAuthenticated,
    }
}