<template>
    <NavBar/>
    <notification />
    <div>
        <router-view />
    </div>
    <div id="reCaptchaContainer"></div>
</template>

<script setup>
import Notification from './components/notification.vue'
import NavBar from './components/nav-bar.vue'
</script>

<style scooped>
.grecaptcha-badge {
    display: none !important;
}
</style>