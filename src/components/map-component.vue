<template>
    <div id="map"></div>
</template>
<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useOpenLayerMapStore } from '@/stores/useMap.store.js';
import { getLength } from 'ol/sphere'

import MapPinIcon from '@/assets/icons/logo_pin.png'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import Feature from 'ol/Feature'
import LineString from 'ol/geom/LineString'
import Style from 'ol/style/Style'
import Stroke from 'ol/style/Stroke'

const openLayerMapStore = useOpenLayerMapStore();
const { map, geoLocation, distance, routeLayer } = storeToRefs(openLayerMapStore)

const marker = ref(null)
const routeCoords = ref([])

const coords = computed(() => {return geoLocation.value}) 

watch(coords, async() => {
//onMounted(async() => {
    map.value = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.TileJSON({
                    url: 'https://api.maptiler.com/maps/streets-v4/tiles.json?key=9tLWFhoeQRaENlHmbSsR'
                })
            })
        ],
        view: new ol.View({
            center: ol.proj.fromLonLat([coords.value.longitude, coords.value.latitude]),
            zoom: 13
        })
    })

    marker.value = new ol.layer.Vector({
        source: new ol. source. Vector({
            features: [
                new ol.Feature({
                    geometry: new ol.geom.Point(
                        ol.proj.fromLonLat([geoLocation.value.longitude, geoLocation.value.latitude])
                    )
                })
            ]
        }),
        style: new ol.style.Style({
            image: new ol.style.Icon({
                src: MapPinIcon,
                scale: 0.3
            })
        })
    })

//    routeCoords.value.push([geoLocation.value.longitude, geoLocation.value.latitude])
//    const line = new LineString(routeCoords.value.map(([lon, lat]) => ol.proj.fromLonLat([lon, lat])))
//    distance.value = getLength(line)
//    console.log('distance: ', distance);
//
//    routeLayer.value = new VectorLayer({
//        source: new VectorSource({
//            features: [new Feature({
//                geometry: new LineString(
//                    routeCoords.value.map(
//                        ([lon, lat]) => ol.proj.fromLonLat([lon, lat])
//                    )
//                )
//            })]
//        }),
//        style: new Style({
//            stroke: new Stroke({
//                color: 'red',
//                width: 4
//            })
//        })
//    })
//    map.value.addLayer(routeLayer.value)
    map.value.addLayer(marker.value)
}, {once: true})
</script>