import { getUserAPI } from "@/api/auth-api"

export const useAuthState = () => {
    
    const setUser = (user) => {
/*         const user = getUserAPI()
        console.log('user: ', user); */
        localStorage.setItem('user', JSON.stringify(user))
    }

    const getUser = () => {
        console.log('#1');
        const response = JSON.parse(localStorage.getItem('user'))
        console.log('response?.user: ', response?.user);
        return response?.user || {}
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