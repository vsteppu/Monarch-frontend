import axios from "axios";

const api = import.meta.env.VITE_API_URL || '/api'

const getExercisesAPI = async (id) => {
    const response = await axios.get(`${api}/get-exercises?id=${id}`)
    return response?.data
}

const getExercisesByDayAPI = async (params) => {
    const response = await axios.get(`${api}/get-exercises-by-day`, {params})
    return response?.data
}

const postExercisesAPI = async (data) => {
    const response = await axios.post(`${api}/add-exercises`, data)
    return response?.data
}

const deleteExerciseAPI = async (id) => {
    return await axios.delete(`${api}/delete-exercise/${id}`)
}

const deleteAllExercisesAPI = async () => {
    return await axios.delete(`${api}/delete-all-exercises`)
}


export {
    getExercisesAPI,
    getExercisesByDayAPI,
    postExercisesAPI,
    deleteExerciseAPI,
    deleteAllExercisesAPI
}