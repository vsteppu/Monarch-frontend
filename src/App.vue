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

const openLayerMapStore = useOpenLayerMapStore()

onMounted(async() => {
    await openLayerMapStore.getLocation()
})
</script>

<style scooped>
.grecaptcha-badge {
    display: none !important;
}
</style>