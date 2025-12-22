<template>
    <div class="w-full h-screen flex justify-center items-center">
        <div class="mx-auto p-4 w-2/3 h-2/3 flex flex-col">
            <span class="text-3xl font-bold">
                Workouts
            </span>
            <div class="overflow-auto w-full scrollbar-custom">
                <div 
                    v-for="exercise in EXERCISES"
                    class="bg-stone-900 p-4 mb-2 font-thin"
                >
                    {{ exercise.displayName }}
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { EXERCISES } from '@/stores/store'
</script>