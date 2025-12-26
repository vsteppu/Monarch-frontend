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
import { useMapTilerStore } from './stores/useMapTiler.store';
import { storeToRefs } from 'pinia';

const mapTilerStore = useMapTilerStore()
const { geoLocation } = storeToRefs(mapTilerStore)

onMounted(async() => {
    await mapTilerStore.getLocation()
})
</script>

<style scooped>
.grecaptcha-badge {
    display: none !important;
}
</style>