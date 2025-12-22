
<template>
    <div class="h-screen w-full flex items-center justify-center">
        <div v-if="loading" class="h-screen w-full">
            <Loading class="size-8"/>
        </div>
        <div v-else class=" w-2/3 h-2/3 flex flex-col">
            <div class="flex justify-between w-full">
                <div class="text-5xl">
                    Timer
                </div>
                <div class="text-6xl w-full bg-stone-900 ">
                    {{ hours + ' / ' + minutes + ' / ' + seconds }}
                </div>
            </div>
            <div class="relative">
                <div id="map" class="absolute w-full h-full"/>
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
const openLayerMapStore = useOpenLayerMapStore();

const exerciseStore = useExerciseStore();
const { showRunningModal } = storeToRefs(exerciseStore)
const { map, geoLocation } = storeToRefs(openLayerMapStore)
const { seconds, minutes, hours, startTimer, stopTimer} = useTimer()

const loading = ref(false)
const startRun = ref(false)
const pauseRun = ref(false)
const marker = ref(null)

const coords = computed(() => geoLocation.value) 
console.log('coords: ', coords.value);
let elementId

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

const closeModal = (value) => {
    showRunningModal.value = value
}

onMounted(async() => {
    map.value = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.TileJSON({
                    url: 'https://api.maptiler.com/maps/streets-v4/tiles.json?key=9tLWFhoeQRaENlHmbSsR',
                    tileSize: 256,
                })
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([coords.value.longitude, coords.value.latitude]),
            zoom: 13
        })
    })
    
    marker.value = new ol.layer.Vector({
        source: new ol. source. Vector({
            features: [
                new ol.Feature({
                    geometry: new ol.geom.Point(
                        ol.proj.fromLonLat([coords.value.longitude, coords.value.latitude])
                    )
                })
            ]
        }),
    })
})
</script>