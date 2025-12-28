<template>
    <header class="w-full h-screen flex justify-end items-center relative">
        <img src="/src/assets/images/004.jpg" alt="Set of traning equipment" class="h-full md:mr-20 w-fit z-0 -scale-x-100">
        <div class="absolute top-2/5 left-9 md:left-20 z-0 font-light">
            <div class="flex flex-col w-2/3 gap-3">
                <span class="text-5xl font-bold font-bbh">ARISE !</span>
                <p><span class="font-bold">MONARCH</span> is a sports app that helps you achieve your fitness goals with personalized workouts, a comprehensive list of exercises, and daily activity tracking for better health.</p>
            </div>
            <div class="absolute gap-4 text-black font-extrabold mt-6 flex p-1 items-center">
                <router-link :to="{ name: 'daily-exercises' }">
                    <div class="opacity-100 bg-white text-black font-extrabold p-2 whitespace-nowrap">
                        Daily Exercise
                    </div>
                </router-link>
                <router-link :to="{ name: 'running' }">
                    <div class="opacity-100 bg-white text-black font-extrabold p-2">
                        Running
                    </div>
                </router-link>
            </div>
        </div>
        <!-- <div class="p-3 w-full flex flex-col justify-center items-center">
            <DailyExercise/>
        </div> -->
    </header>
    <section class="bg-white w-full p-5">
        <H1 class="font-light text-black">
            <span class="text-xl font-bold">MONARCH</span> is a sports app that helps you achieve your fitness goals with personalized workouts, a comprehensive list of exercises, and daily activity tracking for better health.
        </H1>
    </section>
    <footer class="bg-white w-full p-5 text-black text-end">
        Powered by <span class="font-bbh">VURADO</span>
    </footer>
</template>

<script setup>
import DailyExercise from '@/components/daily-exercise.vue'
import RunPath from '../effects/run-path.vue'
</script>