<template>
    <div class="w-full h-screen flex justify-center items-center">
        <div class="mx-auto p-4 w-full md:w-2/3 h-2/3 flex flex-col">
            <span class="text-3xl font-bold">
                Workouts
            </span>
            <div class="overflow-auto w-full scrollbar-custom">
                <div
                    @click="setExercise(exercise)"
                    v-for="exercise in EXERCISES"
                    class="bg-stone-900 p-4 mb-2 font-thin"
                >
                    {{ exercise.displayName }}
                </div>
            </div>
        </div>
    </div>
    <Modal
        @closeModal="closeModal"
        v-if="showExercise"
    >
        <template #header>
            {{ exForModal.displayName }}
        </template>
        <template #content>
            <img :src="exForModal.img" alt="" class="h-full">
        </template>
    </Modal>
</template>
<script setup>
import { ref } from 'vue';
import { EXERCISES } from '@/stores/store'
import Modal from '@/components/modal.vue'

const showExercise = ref(false)
const exForModal = ref(null)

const setExercise = (ex) => {
    exForModal.value = ex
    console.log('exForModal.value: ', exForModal.value);
    showExercise.value = true
}

const closeModal = (val) => {
    showExercise.value = val
    console.log('showExercise.value: ', showExercise.value);
}
</script>