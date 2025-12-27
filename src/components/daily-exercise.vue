<template>
    <div
        class=" text-base md:text-2xl w-full md:w-2/5 font-thin flex flex-col justify-center"
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
                    <button
                        v-if="exercise?.unit_type == 'km'"
                        @click="showRunningModalHandler"
                        class="p-3 my-3 bg-stone-800 ml-5 cursor-pointer"
                    >
                        RUN
                    </button>
                    <div v-else class=" flex flex-col text-center px-3 ml-3 cursor-pointer">
                        <span
                            @click="() => increeseCount(exercise?.name)"
                        >
                            <ChevronUpIcon class="size-10"/>
                        </span>
                        <Divider />
                        <span
                            @click="() => decreeseCount(exercise?.name)"
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
import { computed, ref } from "vue";
import { storeToRefs } from "pinia";
import { useExerciseStore } from "@/stores/exercise.store.js";
import { 
    DAILY_EXERCISE,
    TRAINING_LEVELS
} from "@/stores/store";
import { useAuthState } from "@/composables/auth";
import { useRouter } from "vue-router";

import Divider from '@/components/divider.vue'
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/outline";

const { getUser } = useAuthState();
const router = useRouter();
const exerciseStore = useExerciseStore();
const { showRunningModal } = storeToRefs(exerciseStore)

const userStatus = computed(() => {return getUser()?.meta?.status});
console.log('getUser(): ', getUser());
console.log('userStatus: ', userStatus.value);

const dailyExercises = computed(() => { return DAILY_EXERCISE})

const increeseCount = ( name ) => {
    const exerciseIndex = DAILY_EXERCISE.findIndex(item => item.name === name)
    let updateValue = DAILY_EXERCISE[exerciseIndex]
    updateValue.value = name != 'running' 
        ? updateValue.value + 5
        : updateValue.value + 1
    
    DAILY_EXERCISE[exerciseIndex] = updateValue
};

const decreeseCount = ( name ) => {
    const exerciseIndex = DAILY_EXERCISE.findIndex(item => item.name === name)
    let updateValue = DAILY_EXERCISE[exerciseIndex]
    if (updateValue.value !== 0) updateValue.value = name != 'running'
        ? updateValue.value - 5
        : updateValue.value -1
    DAILY_EXERCISE[exerciseIndex] = updateValue
};

const defaultExerciseToDo = (type) => {
    console.log('type: ', type);
    console.log('userStatus.value: ', userStatus.value);
    const exercises = TRAINING_LEVELS.find(exercise => exercise.name == userStatus.value)
    console.log('exercises?.repetitions: ', exercises?.repetitions);
    return type == 'reps' ? exercises?.repetitions : exercises?.running_km
};

const submitExercises = async() => {
    const data = DAILY_EXERCISE
    await exerciseStore.addDailyExercises(data)
};

const showRunningModalHandler = async() => {
    router.push({name: 'running'})
};
</script>
