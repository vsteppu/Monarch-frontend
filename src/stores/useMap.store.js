import { defineStore } from 'pinia';
import { ref, watch } from 'vue'

export const useOpenLayerMapStore = defineStore('openLayerMapStore', () => {
    const running = ref(false)
    const map = ref(null)
    const geoLocation = ref(null)
    const distance = ref(null)
    const routeCoords = ref([])

    const error = ref(null)

    const getLocation = () => {
        //if (!running.value) return;

        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
                    geoLocation.value = {
                        longitude: position.coords.longitude,
                        latitude: position.coords.latitude,
                        accuracy: position.coords.accuracy
                    }
                    routeCoords.value.push([geoLocation.value.longitude, geoLocation.value.latitude])
                },
                (err) => {
                    error.value = err.message
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
    
    return {
        map,
        geoLocation,
        routeCoords,
        distance,

        getLocation,
    }
})