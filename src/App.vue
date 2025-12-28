<template>
    <notification />
    <NavBar/>
    <router-view />
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
</script>

<style scooped>
.grecaptcha-badge {
    display: none !important;
}
</style>