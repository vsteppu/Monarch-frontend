import Home from '@/pages/home.vue'
import AuthPage from '@/pages/auth/auth-page.vue'
import Progress from '@/pages/progress.vue'
import Workouts from '@/pages/workouts.vue'
import Running from '@/pages/running.vue'
import DailyExercises from '@/pages/daily-exercises.vue'
import Profile from '@/pages/profile.vue'

const routes = [
    { 
        path: '/auth-page', 
        component: AuthPage,
        name: 'auth-page',
        meta: { requiresAuth: false }
    },
    {
        path: '/', 
        component: Home,
        name: 'home',
        meta: { requiresAuth: true }
    },
    {
        path: '/progress', 
        component: Progress,
        name: 'progress',
        meta: { requiresAuth: true }
    },
    { 
        path: '/workouts', 
        component: Workouts,
        name: 'workouts',
        meta: { requiresAuth: true }
    },
    { 
        path: '/running', 
        component: Running,
        name: 'running',
        meta: { requiresAuth: true }
    },
    { 
        path: '/daily-exercises', 
        component: DailyExercises,
        name: 'daily-exercises',
        meta: { requiresAuth: true }
    },
    { 
        path: '/profile', 
        component: Profile,
        name: 'profile',
        meta: { requiresAuth: true }
    },
]

export default routes