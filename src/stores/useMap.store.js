import { defineStore } from 'pinia';
import { onMounted, ref, watch } from 'vue'

export const useOpenLayerMapStore = defineStore('openLayerMapStore', () => {
    const loading = ref(false)
    const map = ref(null)
    const geoLocation = ref(null)
    const location = ref(null)
    const longitude = ref(null)
    const latitude = ref(null)
    const error = ref(null)

    const getLocation = () => {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        geoLocation.value = {
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                            accuracy: position.coords.accuracy
                        }
                        loading.value = false
                    },
                    (err) => {
                        error.value = err.message
                        loading.value = false
                    },
                    {
                        enableHighAccuracy: true,
                        timeout: 10000,
                        maximumAge: 600000
                    }
                )
            } else {
                console.error("Something's wrong");
            }
        })
    }

    onMounted(async() => {
        loading.value = true
        try {
            geoLocation.value = JSON.parse(localStorage.getItem('geolocation'))
        } catch (err) {
            throw err
        } finally {
            loading.value = false
        }
    })

    return {
        loading,
        map,
        geoLocation,
        location,
        longitude,
        latitude,
        error,

        getLocation,
        //baseMapLayer,
        //iconStyle,
        //marker,
        //vectorSource,
        //markerVectorLayer,
    }
})