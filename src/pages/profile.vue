<template>
    <div class="flex items-center justify-center w-full h-screen">
        <div class="w-full md:w-2/3 p-4 text-lg space-y-2 uppercase">
            <h1 class="text-2xl mb-2">Profile</h1>
            <div class="flex justify-between">
                <span>Player</span>
                <span>{{ user.name }}</span>
            </div>
            <Divider />
            <div class="flex justify-between">
                <span>Level</span>
                <span>{{ user.meta.level }}</span>
            </div>
            <Divider />
            <div class="flex justify-between">
                <span>Rank</span>
                <span class="uppercase">{{ user.meta.rank }}</span>
            </div>
            <Divider />
            <div class="flex justify-between">
                <span>Status</span>
                <span>{{ user.meta.status }}</span>
            </div>
            <Divider />
            <div class="flex justify-between text-red-400">
                <span>Daily Exercises</span>
                <span>None</span>
            </div>
            <Divider />
        </div>
    </div>
</template>
<script setup>
import { useAuthState } from '@/composables/auth';
import Divider from '@/components/divider.vue'

const { getUser } = useAuthState()

const user = getUser()
</script>