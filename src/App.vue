<template>
    <notification />

    <component 
        :is="layout" 
        :key="layout"
    >
        <router-view />
    </component>

    <Feedback v-if="showFeedback"/>
    <div id="reCaptchaContainer"></div>
</template>

<script setup>
import { shallowRef } from 'vue';
import defaultLayout from './layouts/default.vue';
import Notification from './components/notification.vue'
import Feedback from './components/feedback.vue'

const layout = shallowRef(defaultLayout);
</script>

<style scooped>
.grecaptcha-badge {
    display: none !important;
}
</style>