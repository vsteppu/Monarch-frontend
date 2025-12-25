import * as maptilersdk from '@maptiler/sdk';
import { ref, watch, onMounted } from 'vue'
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
    const distance = ref(null)
    const routeLayer = ref(null)
    const routeCoords = ref([])

    const getLocation = () => {
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
    }
    watch(geoLocation, (newVal) => {
        console.log('newVal: ', newVal);
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
        routeLayer,

        getLocation,
        //baseMapLayer,
        //iconStyle,
        //marker,
        //vectorSource,
        //markerVectorLayer,
    }
})