
<template>
    <div class="h-screen w-full flex pt-[52px] items-center justify-center">
        <div v-if="loading" class="h-screen w-full">
            <Loading class="size-8"/>
        </div>
        <div v-else class="w-full md:w-2/3 h-full md:h-2/3 flex flex-col bg-amber-400">
            <div class="flex justify-between w-full text-black p-2">
                <div class="text-3xl md:text-5xl">
                    Timer
                </div>
                <div class=" text-3xl md:text-6xl w-full text-end">
                    {{ hours + ' / ' + minutes + ' / ' + seconds }}
                </div>
            </div>
            <div class="flex justify-between w-full text-black p-2">
                <div class="text-3xl md:text-5xl">
                    Distance
                </div>
                <div class=" text-3xl md:text-6xl w-full text-end">
                    {{ convertDistance(distance) }}
                </div>
            </div>
            <div class="relative h-full">
                <MapComponent class="h-full"/>
                <div class="absolute bottom-0 flex w-full justify-center gap-9">
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

import { useOpenLayerMapStore } from '@/stores/useMap.store.js';
import Loading from '@/assets/icons/loading.vue'
import MapComponent from '../components/map-component.vue'

const exerciseStore = useExerciseStore();
const openLayerMapStore = useOpenLayerMapStore();
const { distance } = storeToRefs(openLayerMapStore)
const { showRunningModal } = storeToRefs(exerciseStore)
const { seconds, minutes, hours, startTimer, stopTimer} = useTimer()

const loading = ref(false)
const startRun = ref(false)
const pauseRun = ref(false)

const element = document.createElement('div')

const startRunningHandler = () => {
    pauseRun.value = false
    startRun.value = true
    startTimer()
}

const pauseRunningHandler = () => {
    pauseRun.value = true
    startRun.value = false
    stopTimer()
}

const stopRunningHandler = () => {
    startRun.value = false
    pauseRun.value = false
}

const convertDistance = (num) => {
    return Math.round(num * 100) / 100
}
</script>