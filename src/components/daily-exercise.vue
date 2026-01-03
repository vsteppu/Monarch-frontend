<template>
    <div
        class=" text-base md:text-2xl w-full md:w-2/5 md:font-thin font-light flex flex-col justify-center"
    >
        <h1>Daily exercise</h1>
        <div
            v-for="exercise in dailyExercises"
        >
            <div class="flex items-center justify-between">
                <h3>{{ exercise?.display_name }}</h3>

                <div class="flex items-center justify-center">
                    {{ exercise?.value }} / {{ defaultExerciseToDo(exercise?.unit_type)}}
                    {{ exercise?.unit_type }}
                    
                    <router-link 
                        :to="{name: 'running'}" 
                        v-if="exercise?.unit_type == 'km'"

                    >
                        <div
                            @click="goRunningHandler"
                            class="p-3 my-3 bg-stone-800 ml-5 cursor-pointer"
                        >
                            RUN
                        </div>
                    </router-link>
                    <div v-else class=" flex flex-col text-center px-3 ml-3 cursor-pointer">
                        <span
                            @mousedown="startIncresingCount(exercise?.name)"
                            @mouseup="stopIntervalCount()"
                        >
                            <ChevronUpIcon class="size-10"/>
                        </span>
                        <Divider />
                        <span
                            @mousedown="startDecresingCount(exercise?.name)"
                            @mouseup="stopIntervalCount()"
                        >
                            <ChevronDownIcon class="size-10"/>
                        </span>
                    </div>
                </div>
            </div>
            <Divider />
        </div>
        <!-- todo: Add a abutton to start running instead of just adding the km -->
        <div class="mx-auto flex justify-around w-full">
            <button 
                @click="submitExercises"
                class=" bg-green-800 mt-6 w-fit px-10 py-4 cursor-pointer"
            >
                Submit
            </button>
        </div>
        
    </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { useExerciseStore } from "@/stores/exercise.store.js";
import { useAuthState } from "@/composables/auth";
import { useAuthStore } from "@/stores/auth.store";
import { DAILY_EXERCISE, TRAINING_LEVELS } from "@/stores/store";

import Divider from '@/components/divider.vue'
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/outline";

const authStore = useAuthStore();
const { getUserId } = useAuthState();
const router = useRouter();
const exerciseStore = useExerciseStore();

const userId = ref(null)
const userStatus = ref(null)
const setIntervalRef = ref(null)
const dailyExercises = ref(DAILY_EXERCISE)

const defaultExerciseToDo = (type) => {
    const exercises = TRAINING_LEVELS.find(exercise => { return exercise.name === userStatus.value})
    return type == 'reps' ? exercises?.repetitions : exercises?.running_km
};

const increeseCount = (name) => {
    const exerciseIndex = dailyExercises.value.findIndex(item => item.name === name)
    let updateValue = dailyExercises.value[exerciseIndex]
    updateValue.value++

    return dailyExercises.value[exerciseIndex] = updateValue
};

const decreeseCount = (name) => {
    const exerciseIndex = dailyExercises.value.findIndex(item => item.name === name)
    let updateValue = dailyExercises.value[exerciseIndex]
    if (updateValue.value !== 0) updateValue.value--

    return dailyExercises.value[exerciseIndex] = updateValue
};

const goRunningHandler = async() => {
    router.push({name: 'running'})
};

const startIncresingCount = (name) => {
    increeseCount(name)
    setIntervalRef.value = setInterval(() => {
        increeseCount(name)
    }, 200)
}

const startDecresingCount = (name) => {
    decreeseCount(name)
    setIntervalRef.value = setInterval(() => {
        decreeseCount(name)
    }, 200)
}

const stopIntervalCount = () => {
    clearInterval(setIntervalRef.value)
    setIntervalRef.value = null
}

const submitExercises = async() => {
    console.log('dailyExercises.value: ', dailyExercises.value);
    const data = {
        user_id: userId.value,
        exercises: dailyExercises.value
    }
    console.log('data: ', data);
    await exerciseStore.addDailyExercises(dailyExercises.value)
};

onMounted(async() => {
    userId.value = await getUserId()
    const response = await authStore.userParameters(userId.value)
    userStatus.value = response.status
})
</script>
