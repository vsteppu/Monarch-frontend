<template>
    <div
        class="text-2xl w-2/5 font-thin font-montserrat flex flex-col justify-center"
    >
        <h1>Daily exercise</h1>
        <div
            v-for="exercise in dailyExercise"
        >
            <div class="flex items-center justify-between mb-2 font-montserrat">
                <h3>{{ exercise?.display_name }}</h3>

                <div class="flex items-center justify-center">
                    {{ exercise?.value }} / {{ defaultExerciseToDo(exercise?.unit_type)}}
                    {{ exercise?.unit_type }}
                    <div class=" flex flex-col text-center px-3 ml-3 cursor-pointer">
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
import { onMounted, ref } from "vue";
import { useExerciseStore } from "@/stores/exercise.store.js";
import { DAILY_EXERCISE } from "@/stores/store";
import { useNotificationStore } from "@/stores/notification.store";
import Divider from '@/components/divider.vue'
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/vue/24/outline";

const exerciseStore = useExerciseStore();
const dailyExercise = ref(DAILY_EXERCISE)

const userStatus = ref('beginner');
const defaultExercisesByRank = ref([
    {
        id: 1,
        name: "beginner",
        displayName: "Beginner",
        repetitions: 20,
        running_km: 2,
    },
    {
        id: 2,
        name: "basic",
        displayName: "Basic",
        repetitions: 40,
        running_km: 4,
    },
    {
        id: 3,
        name: "intermediate",
        displayName: "Intermediate",
        repetitions: 60,
        running_km: 6,
    },
    {
        id: 4,
        name: "advanced",
        displayName: "Advanced",
        repetitions: 80,
        running_km: 8,
    },
    {
        id: 5,
        name: "elite",
        displayName: "Elite",
        repetitions: 100,
        running_km: 10,
    }
])

const loading = ref(false);

const increeseCount = ( name ) => {
    const exerciseIndex = dailyExercise.value.findIndex(item => item.name === name)
    let updateValue = dailyExercise.value[exerciseIndex]
    updateValue.value = name != 'running' 
        ? updateValue.value + 5
        : updateValue.value + 1
    
    dailyExercise.value[exerciseIndex] = updateValue
};

const decreeseCount = ( name ) => {
    const exerciseIndex = dailyExercise.value.findIndex(item => item.name === name)
    let updateValue = dailyExercise.value[exerciseIndex]
    if (updateValue.value !== 0) updateValue.value = name != 'running'
        ? updateValue.value - 5
        : updateValue.value -1
    dailyExercise.value[exerciseIndex] = updateValue
};

const defaultExerciseToDo = (type) => {
    const exercises = defaultExercisesByRank.value.find(exercise => exercise.name == userStatus.value)
    return type == 'reps' ? exercises.repetitions : exercises.running_km
};

const submitExercises = async() => {
    const data = dailyExercise.value
    await exerciseStore.addDailyExercises(data)
};
</script>
