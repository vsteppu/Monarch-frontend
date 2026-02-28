<template>
    <div class="flex items-center justify-center w-full h-screen">
        <div v-if="!loading" 
            class="w-full md:w-2/3 p-4 text-lg space-y-2 uppercase"
        >
            <h1 class="text-2xl mb-2">Profile</h1>
            <div class="flex justify-between">
                <span>Player</span>
                <span>{{ user?.name }}</span>
            </div>
            <Divider />
            <div class="flex justify-between">
                <span>Level</span>
                <span>{{ user?.level }}</span>
            </div>
            <Divider />
            <div class="flex justify-between">
                <span>Rank</span>
                <span class="uppercase">{{ user?.rank }}</span>
            </div>
            <Divider />
            <div class="flex justify-between">
                <span>Status</span>
                <span>{{ user?.status }}</span>
            </div>
            <Divider />
            <div class="flex justify-between text-red-400">
                <span>Daily Exercises</span>
                <span>None</span>
            </div>
            <Divider />
            <button
                @click="handleDeleteAccount"
                class="cursor-pointer"
            >
                Delete Account
            </button>
        </div>
        <div v-else>
            <Loading />
        </div>
    </div>
</template>
<script setup>
import { onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth.store';
import { useAuthState } from '@/composables/auth';
import Divider from '@/components/divider.vue'
import Loading from '@/assets/icons/loading.vue'

const authStore = useAuthStore()
const { getUserId } = useAuthState()

const loading = ref(false)
const user = ref(null)
const id = ref(null)

const handleDeleteAccount = async() => {
    await authStore.deleteAccount(id.value)
}

onMounted(async() => {
    loading.value = true
    id.value = getUserId()
    user.value = await authStore.getUser(id.value)
    loading.value = false
})
</script>
