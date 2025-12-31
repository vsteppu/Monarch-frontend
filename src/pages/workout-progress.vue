<template>
    <div class="w-full flex">
        <div class="mx-auto w-full md:w-2/3 bg-stone-900 h-full mt-28">
            <div class="flex items-center text-center px-3 h-full w-full">
                <span
                    @click="moveBackwardHandler"
                    class="cursor-pointer"
                >
                    <ChevronLeftIcon class="size-10"/>
                </span>
                <FadeEffect>
                    <WorkoutDetailsCard
                        v-model="workoutDetails"
                        :key="currentWorkout"
                    />
                </FadeEffect>
                <span
                    @click="moveForwardHandler"
                    class="cursor-pointer"
                >
                    <ChevronRightIcon class="size-10"/>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { useExerciseStore } from "@/stores/exercise.store.js";
import { useNotificationStore } from "@/stores/notification.store";
import WorkoutDetailsCard from '@/components/workout-details-card.vue'
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/vue/24/outline";
import FadeEffect from '@/effects/fade-effect.vue'

const notificationStore = useNotificationStore();
const exerciseStore = useExerciseStore();
const loading = ref(false);

const workouts = ref([]);
const currentWorkout = ref(null);
const previousDetails = computed(() => workouts?.value[currentWorkout.value - 1])
const workoutDetails = computed(() => workouts?.value[currentWorkout.value])
const futureDetails = computed(() => workouts?.value[currentWorkout.value + 1])

const handleFetchExercises = async () => {
    workouts.value = await exerciseStore.fetchDailyExercises();
    currentWorkout.value = workouts.value.length - 1
}

const moveBackwardHandler = async () => {
    if (currentWorkout.value != 0) currentWorkout.value--
    return
}

const moveForwardHandler = async () => {
    if (currentWorkout.value != workouts.value.length - 1) currentWorkout.value++
    return
}

onMounted(async() => {
    await handleFetchExercises();
});
</script>