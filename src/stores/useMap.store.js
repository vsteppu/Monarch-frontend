import * as maptilersdk from '@maptiler/sdk';
import { ref, watch, onMounted } from 'vue'
import { defineStore } from 'pinia';
import { Marker } from '@maptiler/sdk';

export const useOpenLayerMapStore = defineStore('openLayerMapStore', () => {
    const apiKey = import.meta.env.VITE_MAPTILER_API_KEY

    const mapContainer = ref(null)
    const running = ref(false)
    const map = ref(null)
    const geoLocation = ref(null)
    const distance = ref(null)
    const routeCoords = ref([])
    const error = ref(null)

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
                        accuracy: position.coords.accuracy
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

    const trackMovement = () => {
        if (!running.value) return;

        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(
                (position) => {
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
        } else {
            console.error("Something's wrong");
        }
    }

    const setMap = (newVal) => {
        const {latitude, longitude} = newVal

        if (newVal){
            map.value = new maptilersdk.Map({
                apiKey,
                container: mapContainer.value,
                center: [longitude, latitude],
                zoom: 17
            });


            new Marker({
                color: '#ff0000',
                draggable: false,
                scale: 0.7
            })
                .setLngLat([longitude, latitude])
                .addTo(map.value)
        }
    }

    const setRunningPath = () => {
        trackMovement()
/*
        map.value.on('load', () => { 
            map.value.addSource('LineString', {
                type: 'geojson',
                data: geojson
            });
            //map.value.getSource
            
             
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
                    'line-width': 3
                }
            }); 
        })
        */
    }
    
    /* const updateRunningPath = () => {

        if (!map.value) return
        const source = map.value.getSource('LineString')

        if (source) {
            source.setData({
                type: 'FeatureCollection',
                features: [{
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: coords
                }
                }]
            })
        }
    } */

    watch(geoLocation, (newVal) => {
        setMap(newVal)
    }, {once:true})

    watch(routeCoords, () => {
        console.log('#1');
        //updateRunningPath()
        
        map.value.on('load', () => { 
            map.value.addSource('LineString', {
                type: 'geojson',
                data: geojson
            });
            //map.value.getSource
            
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
                    'line-width': 3
                }
            });
        })
    }, { deep: true })
    
    return {
        map,
        geoLocation,
        routeCoords,
        distance,
        mapContainer,

        getLocation,
        setMap,
        setRunningPath,
        trackMovement,
    }
})