<template>
    <div class="w-full flex">
        <div class="mx-auto w-full md:w-2/3 bg-stone-900 h-full mt-28">
            <div class="flex flex-col items-center text-center h-full w-full">
                <div class="flex items-center w-full my-3 px-5">
                    <span
                        @click="previousMonthHandler"
                        class="cursor-pointer"
                    >
                        <ChevronLeftIcon class="size-10"/>
                    </span>
                    <span class="w-full">{{ monthToString + ' ' + year }}</span>
                    <span
                        @click="nextMonthHandler"
                        class="cursor-pointer"
                    >
                        <ChevronRightIcon class="size-10"/>
                    </span>
                </div>
                <div class="grid grid-cols-7 gap-0 w-full">
                    <div v-for="day in calendar" 
                        @click="selectDayHandler(day)"
                        :class="[
                            'flex justify-center items-center p-2 w-full outline-2 outline-black',
                            currentDay === day 
                                ? 'bg-red-700' 
                                : selectedDay === day 
                                    ? 'bg-green-700'
                                    : 'bg-stone-600',
                        ]"
                    >
                        {{ setCalendar(day) }}
                    </div>
                </div>
                <div v-if="workouts.length !== 0" class="w-full">
                    <div v-for="workout in workouts">
                        <FadeEffect>
                            <WorkoutDetailsCard
                                v-if="workouts"
                                :workout="workout"
                                :key="currentWorkout"
                            />
                        </FadeEffect>
                    </div>
                </div>
                <div v-else class="w-80 rounded p-6 flex flex-col font-extralight">
                    No Registered Data
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useExerciseStore } from "@/stores/exercise.store.js";
import { useNotificationStore } from "@/stores/notification.store";
import { useCreateCalendar } from "@/composables/useCreateCalendar";

import WorkoutDetailsCard from '@/components/workout-details-card.vue'

import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/vue/24/outline";
import FadeEffect from '@/effects/fade-effect.vue'

const exerciseStore = useExerciseStore();
const { calendar, monthToString, month, year, currentDay, selectedDay, setCalendar, previousMonthHandler, nextMonthHandler } = useCreateCalendar();

const currentWorkout = ref(null);
const workouts = ref([]);

const selectDayHandler = async(day) => {
    if (day <= 0) {
        previousMonthHandler()
    } else if (day > 31) {
        nextMonthHandler()
    }

    const date = new Date(year.value, month.value, day).toDateString()

    const response = await exerciseStore.fetchDailyExercisesByDay(date)
    workouts.value = response.exercises

    selectedDay.value = day
}

onMounted(async() => {
    //await handleFetchExercises();
    await selectDayHandler(currentDay)
});
</script>