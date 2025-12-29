<template>
    <div id="map"></div>
</template>
<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useMapTilerStore } from '@/stores/useMapTiler.store.js';

const mapTilerStore = useMapTilerStore();
const { mapContainer, loadingMap } = storeToRefs(mapTilerStore)

onMounted(async() => {
    mapContainer.value = document.getElementById('map');
    console.log('mapContainer.value: ', mapContainer.value);
})
</script>