
<template>
    <div class="h-screen w-full flex md:items-center justify-center">
        <div v-if="loading" class="h-screen w-full">
            <Loading class="size-8"/>
        </div>
        <div v-else class="w-full grow md:w-2/3 md:h-2/3 flex flex-col bg-amber-400 mt-14">
            <div class="flex text-3xl justify-between w-full text-black p-2">
                <div>
                    Timer
                </div>
                <div class="w-full text-end">
                    {{ hours + ' / ' + minutes + ' / ' + seconds }}
                </div>
            </div>
            <div class="flex justify-between text-3xl w-full text-black p-2">
                <div>
                    Distance
                </div>
                <div class="w-full text-end">
                    {{ distance / 100 }} km
                </div>
            </div>
            <!-- <Running /> -->
            <div class="relative h-full">
                <MapComponent class="h-full"/>
                <div class="absolute bottom-15 flex justify-center w-full gap-9">
                    <button
                        v-if="!startRun"
                        @click="startRunningHandler"
                        class="bg-stone-900 p-4"
                    >
                        <span v-if="!startRun && !pauseRun" class="text-5xl">RUN</span>
                        <PlayIcon v-else class="size-12"/>
                    </button>
                    <button
                        v-if="startRun"
                        @click="pauseRunningHandler"
                        class="bg-stone-900 p-4 cursor-pointer"
                    >
                        <PauseIcon class="size-12"/>
                    </button>
                    <button
                        v-if="pauseRun"
                        @click="stopRunningHandler"
                        class="bg-stone-900 p-4 cursor-pointer"
                    >
                        <StopIcon class="size-12"/>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, onMounted, ref, resolveComponent, watch } from 'vue';
import { storeToRefs } from "pinia";
import { useExerciseStore } from '@/stores/exercise.store';
import { useTimer } from '@/composables/useTimer';

import { PlayIcon, PauseIcon, StopIcon, } from "@heroicons/vue/24/outline";

import { useMapTilerStore } from '@/stores/useMapTiler.store.js';
import Loading from '@/assets/icons/loading.vue'
import MapComponent from '../components/map-component.vue'
import Running from '../effects/running.vue'

const exerciseStore = useExerciseStore();
const mapTilerStore = useMapTilerStore();
const { distance, routeCoords } = storeToRefs(mapTilerStore)
const { showRunningModal } = storeToRefs(exerciseStore)
const { seconds, minutes, hours, startTimer, stopTimer} = useTimer()

const loading = ref(false)
const startRun = ref(false)
const pauseRun = ref(false)

const element = document.createElement('div')

const startRunningHandler = () => {
    routeCoords.value == 0 
        ? mapTilerStore.addRunningPath()
        : mapTilerStore.resumeRunningPath()

    pauseRun.value = false
    startRun.value = true
    startTimer()
}

const pauseRunningHandler = () => {
    mapTilerStore.pauseRunningPath()
    pauseRun.value = true
    startRun.value = false
    stopTimer()
}

const stopRunningHandler = () => {
    startRun.value = false
    pauseRun.value = false
    mapTilerStore.completeRunningPath()
}

onMounted(() => {
    mapTilerStore.getLocation()
})
</script>