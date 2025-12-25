import { defineStore } from 'pinia';
import { ref, watch } from 'vue'

export const useOpenLayerMapStore = defineStore('openLayerMapStore', () => {
    const running = ref(false)
    const map = ref(null)
    const geoLocation = ref(null)
    const error = ref(null)
    const distance = ref(null)
    const routeLayer = ref(null)
    const routeCoords = ref([])

    const getLocation = () => {
        //if (!running.value) return;

        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    geoLocation.value = {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    }
                    routeCoords.value.push([geoLocation.value.longitude, geoLocation.value.latitude])
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
    }

    watch(geoLocation, () => {
        console.log('routeCoords.value: ', routeCoords.value);
    })

    onMounted(async() => {
        loading.value = true
        try {
            //geoLocation.value = JSON.parse(localStorage.getItem('geolocation'))
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
        distance,

        getLocation,
    }
})