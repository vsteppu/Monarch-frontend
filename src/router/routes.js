import Home from '@/pages/home.vue'
import AuthPage from '@/pages/auth/auth-page.vue'
import RequestProject from '@/pages/request-project.vue'
import Gallery from '@/pages/gallery.vue'
import Running from '@/pages/running.vue'
import DailyExercises from '@/pages/daily-exercises.vue'
import Profile from '@/pages/profile.vue'

import GalleryFolder from '@/components/gallery-folder.vue'

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
        meta: { requiresAuth: false }
    },
    {
        path: '/gallery', 
        component: Gallery,
        name: 'gallery',
        meta: { requiresAuth: false }
    },
    {
        path: '/gallery-folder/:id?',
        component: GalleryFolder,
        name: 'gallery.folder',
        meta: { requiresAuth: false }
    },
    { 
        path: '/request-project', 
        component: RequestProject,
        name: 'request-project',
        meta: { requiresAuth: false }
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