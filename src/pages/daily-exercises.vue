<template>
    <header class="w-full h-screen flex justify-end items-center relative">
        <div class="p-3 w-full flex flex-col justify-center items-center">
            <DailyExercise/>
        </div>
    </header>
</template>

<script setup>
import DailyExercise from '@/components/daily-exercise.vue'
import RunPath from '../effects/run-path.vue'
</script>