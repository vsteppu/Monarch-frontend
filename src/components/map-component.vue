<template>
    <div id="map"></div>
</template>
<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useOpenLayerMapStore } from '@/stores/useMap.store.js';

const openLayerMapStore = useOpenLayerMapStore();
const { mapContainer } = storeToRefs(openLayerMapStore)

onMounted(async() => {
    mapContainer.value = document.getElementById('map');
    openLayerMapStore.getLocation()
})
</script>