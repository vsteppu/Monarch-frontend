<template>
    <notification />
    <NavBar/>
    <router-view />
    <Feedback v-if="showFeedback"/>
    <div id="reCaptchaContainer"></div>
</template>

<script setup>
import { onMounted } from 'vue';
import Notification from './components/notification.vue'
import NavBar from './components/nav-bar.vue'
import { useMapTilerStore } from './stores/useMapTiler.store';
import { storeToRefs } from 'pinia';
import Feedback from './components/feedback.vue'
import { useAuthStore } from './stores/auth.store';
import { useAuthState } from './composables/auth';

const authStore = useAuthStore()
const mapTilerStore = useMapTilerStore()
const { getUserId } = useAuthState()
const { geoLocation } = storeToRefs(mapTilerStore)
</script>

<style scooped>
.grecaptcha-badge {
    display: none !important;
}
</style>