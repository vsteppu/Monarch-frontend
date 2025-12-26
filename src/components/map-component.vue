<template>
    <div id="map"></div>
</template>
<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useMapTilerStore } from '@/stores/useMapTiler.store.js';

const mapTilerStore = useMapTilerStore();
const { mapContainer } = storeToRefs(mapTilerStore)

onMounted(async() => {
    mapContainer.value = document.getElementById('map');
})
</script>