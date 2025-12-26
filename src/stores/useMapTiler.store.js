import * as mapTilerSDK from '@maptiler/sdk';
import { defineStore } from 'pinia';
import { ref, watch } from 'vue'
import { testCoords } from './store';

export const useMapTilerStore = defineStore('mapTilerStore', () => {
    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY

    const mapContainer = ref(null)
    const map = ref(null)
    const geoLocation = ref(null)
    const distance = ref(0)
    const routeCoords = ref([])
    const sum = ref([])
    const watchId = ref(null)
    const error = ref(null)

    const pointToPoint = ref(null)
    const traveledDistance =  ref(null)
    const convertToKM = ref(null)
    
    const count = ref(0)

    const geojson = {
            'type': 'FeatureCollection',
            'features': [
                {
                    'type': 'Feature',
                    'geometry': {
                        'type': 'LineString',
                        'properties': {},
                        'coordinates': routeCoords.value
                    }
                }
            ]
        };

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    geoLocation.value = {
                        longitude: position.coords.longitude,
                        latitude: position.coords.latitude,
                    }
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

    const watchLocationHandler = () => {
        if (!navigator.geolocation) return 

        /* setInterval(() => {
            if (count.value == 30) count.value = 0
            routeCoords.value.push(testCoords[count.value])
            count.value = count.value + 1
        }, 2500) */
        watchId.value = navigator.geolocation.watchPosition((position) => {
                routeCoords.value.push([position.coords.longitude, position.coords.latitude])
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
    }

    const addMapHandler = (coordinates) => {
        const {latitude, longitude} = coordinates

        map.value = new mapTilerSDK.Map({
            apiKey,
            container: mapContainer.value,
            center: [longitude, latitude],
            zoom: 17,
            geolocateControl: false,
        });
        
        map.value.on('load', () => {
            const geolocate = new mapTilerSDK.GeolocateControl({
                trackUserLocation: true,
                showUserLocation: true,
                positionOptions: {
                    enableHighAccuracy: true
                },
                fitBoundsOptions: {
                    maxZoom: 17
                }
            })

            map.value.addControl(geolocate)

            setTimeout(() => {
                geolocate.trigger()
            }, 300)
        })
    }


    const addRunningPath = () => {
        if (!map.value) return
        watchLocationHandler()
        
        map.value.addSource('LineString', {
            type: 'geojson',
            data: geojson
        });

        map.value.addLayer({
            'id': 'LineString',
            'type': 'line',
            'source': 'LineString',
            'layout': {
                'line-join': 'round',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#000',
                'line-width': 4
            }
        });

        
        setInterval(() => {
            if (routeCoords.value.length >= 2) {
                calculateDistance(routeCoords.value, distance.value)
            }
        }, 3000)
    }

    const updateRunningPath = (coordinates) => {
        const source = map.value.getSource('LineString')

        if (source) {
            source.setData({
                type: 'FeatureCollection',
                features: [{
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: coordinates
                }
                }]
            })
        }
    }

    const pauseRunningPath = () => {
        navigator.geolocation.clearWatch(watchId.value)
    }

    const resumeRunningPath = () => {
        watchLocationHandler()
    }

    const completeRunningPath = () => {
        const source = map.value.getSource('LineString')

        if (source) {
            map.value.removeLayer('LineString')
            map.value.removeSource('LineString')
            navigator.geolocation.clearWatch(watchId.value)
        }
    }

    const calculateDistance = (coordsArr) => {
        const [firstLong, firstLat] = coordsArr.at(-1)
        const [secondLong, secondLat] = coordsArr.at(-2)

        const firstPoint = new mapTilerSDK.LngLat(firstLong, firstLat)
        const secondPoint = new mapTilerSDK.LngLat(secondLong, secondLat)

        pointToPoint.value = firstPoint.distanceTo(secondPoint)
        distance.value = distance.value + pointToPoint.value
        distance.value = Math.round(distance.value) / 100
    }

    watch(geoLocation, (newVal) => { 
        addMapHandler(newVal)
    }, {once:true})

    watch(routeCoords, (coordinates) => {
        if (routeCoords.value == []) return;
        if (!map.value) return;
        
        updateRunningPath(coordinates)
    }, { deep: true })

    return {
        map,
        geoLocation,
        routeCoords,
        distance,
        mapContainer,
        sum,

        pointToPoint,
        traveledDistance,
        convertToKM,

        getLocation,
        addMapHandler,
        addRunningPath,
        updateRunningPath,
        completeRunningPath,
        calculateDistance,
        pauseRunningPath,
        resumeRunningPath,
    }
})