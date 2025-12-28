import { getUserAPI } from "@/api/auth-api"

export const useAuthState = () => {
    
    const setUser = (user) => {
/*         const user = getUserAPI()
        console.log('user: ', user); */
        localStorage.setItem('user', JSON.stringify(user))
    }

    const getUser = () => {
        const raw = localStorage.getItem('user')
        if (!raw) return null
        try {
            const response = JSON.parse(raw)
            return response?.user || null
        } catch(e) {
            console.error('Failed to parse user from localStorage', e)
            return null
        }
    }


    const isAuthenticated = () => {
        const response = JSON.parse(localStorage.getItem('user'))
        return response?.success ?? false
    }

    return {
        setUser,
        getUser,
        isAuthenticated,
    }
}