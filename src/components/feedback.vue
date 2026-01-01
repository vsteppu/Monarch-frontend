<template>
    <Modal
        :containerColor="'bg-stone-800'"
    >
        <template #header>
            Feedback
        </template>
        <template #content>
            <textarea 
                v-model="feedback" 
                placeholder="Please, write your feedback here..."
                class="w-full bg-stone-100 text-black font-semibold"
            />
        </template>
        <template #actions>
            <div class="mt-5 flex justify-end w-full">
                <button 
                    @click="sendFeedbackHandler"
                    class="bg-red-600 p-3 cursor-pointer"
                >
                    Send Feedback
                </button>
            </div>
        </template>
    </Modal>
</template>
<script setup>
import { ref } from 'vue';
import Modal from '@/components/modal.vue'

import { useAuthState } from '@/composables/auth';

const { getUser } = useAuthState()

const user = getUser()
console.log('user: ', user);

const feedback = ref('')

const sendFeedbackHandler = async() => {
    const response = await fetch(
        `https://gmail.googleapis.com/gmail/v1/users/${user.email}/messages/send`, 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({text: feedback.value})
        }
    )
    console.log('response: ', response);
    return response
}
</script>