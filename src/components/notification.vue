<template>
    <TopDropEffect>
        <div
            v-if="showNotification"
            class="absolute top-0 z-999 font-extralight text-center w-full pointer-events-none"
        >
            <div 
                v-for="notification in notifications"
                :class="
                    notification.type == 'error'
                    ? 'bg-red-600' 
                    : 'bg-green-600'
                "
                class="py-2"
            >
                {{ notification.message }}
            </div>
        </div>
    </TopDropEffect>
</template>

<script setup>
import { storeToRefs } from 'pinia';

import { useNotificationStore } from '@/stores/notification.store';
import TopDropEffect from '../effects/top-drop-effect.vue'

const notificationStore = useNotificationStore()
const { notifications, showNotification } = storeToRefs(notificationStore)

</script>