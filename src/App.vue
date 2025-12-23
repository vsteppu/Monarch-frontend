<template>
    <NavBar/>
    <notification />
    <div>
        <router-view />
    </div>
    <div id="reCaptchaContainer"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import Notification from './components/notification.vue'
import NavBar from './components/nav-bar.vue'
import { useOpenLayerMapStore } from './stores/useMap.store';
import { storeToRefs } from 'pinia';

const openLayerMapStore = useOpenLayerMapStore()
const { geoLocation } = storeToRefs(openLayerMapStore)

onMounted(async() => {
    console.log('geoLocation.value: ', geoLocation.value);
    await openLayerMapStore.getLocation()
})
</script>

<style scooped>
.grecaptcha-badge {
    display: none !important;
}
</style>