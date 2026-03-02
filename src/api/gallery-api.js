import axios from "axios";

const api = import.meta.env.VITE_API_URL || '/api'

const getImagesAPI = async () => {
    const response = await axios.get(`${api}/get-images`)
    console.log('response?.data: ', response?.data);
    return response?.data?.data;
}

const postImagesAPI = async (data) => {
    const response = await axios.post(`${api}/add-images`, data)
    return response?.data
}

const deleteImageAPI = async (id) => {
    return await axios.delete(`${api}/delete-image/${id}`)
}

export {
    getImagesAPI,
    postImagesAPI,
    deleteImageAPI
}