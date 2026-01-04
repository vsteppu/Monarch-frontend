<template>
    <div class="flex items-center h-full w-full">
        <div class="w-full rounded p-6 flex flex-col font-extralight">
            <div>
                <div class="text-start text-2xl font-bold justify-between flex my-2">
                    <span>
                        Date
                    </span>
                    <span class="text-red-400">
                        {{ workoutDate }}
                    </span>
                </div>
                <div
                    v-for="item in exercises"
                    :key="item.id"
                    class="flex justify-between text-xl"
                >
                    <div>{{ item.display_name }}</div>
                    <div>
                        <span>{{ item.value }}</span>
                        <span class="ml-2">{{ item.unit_type }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, toRefs, watch } from "vue";
import { sanitizeDate } from "@/stores/helpers";

const props = defineProps({
    workout: {
        type: Object,
        default: () => {}
    }
})

const { workout } = toRefs(props)

const exercises = computed(() => workout.value?.daily_exercise)
const workoutDate = computed(() => { return sanitizeDate(workout.value?.createdAt) })
</script>
