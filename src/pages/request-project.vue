<template>
    <div class="w-full flex justify-center items-center">
        <div class="m-auto font-extrabold md:text-6xl text-3xl p-10 w-full md:w-2/3 h-2/3 flex flex-col">
            We're sorry, but the request project feature is currently unavailable.
            Please check back later or contact us for more information.
        </div>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import Modal from '@/components/modal.vue'

const showExercise = ref(false)
const exForModal = ref(null)
</script>