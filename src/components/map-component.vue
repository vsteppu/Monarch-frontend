<template>
    <div id="map"></div>
</template>
<script setup>
//import '@maptiler/sdk/dist/maptiler-sdk.css';
import axios from 'axios';
import { ref, computed, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useOpenLayerMapStore } from '@/stores/useMap.store.js';
import { getLength } from 'ol/sphere'

import { Map, Marker, MapStyle } from '@maptiler/sdk';
import * as maptilersdk from '@maptiler/sdk';
import MapPinIcon from '@/assets/icons/logo_pin.png'

const apiKey = import.meta.env.VITE_MAPTILER_API_KEY

const openLayerMapStore = useOpenLayerMapStore();
const { map, geoLocation, distance, routeCoords } = storeToRefs(openLayerMapStore)

let mapContainer

watch(geoLocation, async(newVal) => {
    const {latitude, longitude} = newVal

    if (newVal){
        map.value = new maptilersdk.Map({
            apiKey,
            container: mapContainer,
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
    map.value.on('load', () => { 
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
        console.log('geojson: ', geojson);
        
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
}, {once:true})

watch(routeCoords, (coords) => {
    if (!map.value) return
    const source = map.value.getSource('LineString')
    console.log('source: ', source);

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
}, { deep: true })

onMounted(async() => {
    mapContainer = document.getElementById('map');
})
</script>