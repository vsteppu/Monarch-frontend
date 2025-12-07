import { ref } from "vue";
import { defineStore } from "pinia";
import { deleteAllExercisesAPI, deleteExerciseAPI, getExercisesAPI, postExercisesAPI } from "@/api/exercises-api";
import { useAuthState } from "@/composables/auth";
import { useNotificationStore } from "./notification.store";

export const useExerciseStore = defineStore( "exercise-store", () => {
    const notificationStore = useNotificationStore()
    const { getUser } = useAuthState()
    const user = getUser()

    const workoutHistory = ref(null)

    const fetchDailyExercises = async() => {
        try{
            const response = await getExercisesAPI()
            workoutHistory.value = response?.exercises
            return workoutHistory.value
        } catch (err) {
            console.error(err)
            notificationStore.notify("Fetching exercises wasn't successful", "error")
        }
    }

    const addDailyExercises = async(exercises) => {
        try{
            const data = { user_id: user.id, exercises }
            const response = await postExercisesAPI(data)
            if (response.success){
                notificationStore.notify("Exercise was added", "success")
            }
            return response
        } catch (err) {
            throw err
        }
    }

    const deleteDailyExercise = async() => {
        const id = 11
        try{
            await deleteExerciseAPI(id)
        } catch (err) {
            throw err
        }
    }

    const deleteAllDailyExercises = async() => {
        try{
            await deleteAllExercisesAPI()
        } catch (err) {
            throw err
        }
    }

    return {
        workoutHistory,
        
        fetchDailyExercises,
        addDailyExercises,
        deleteDailyExercise,
        deleteAllDailyExercises,
    }
})