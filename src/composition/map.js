import L from 'leaflet'
import { reactive, onMounted } from 'vue'

const LYON_LAT_LNG = [45.763420, 4.834277]
const BASE_ZOOM = 13

const createIcon = properties => {
    const capacity = properties.bike_stands
    const availability = properties.available_bikes
    const ratio = availability / capacity
    console.log(ratio)
    const color = ratio === 0 ? 'red' : ratio <= 0.5 ? 'orange' : 'green'
    return L.icon({
        iconUrl: require(`@/assets/icons/station-${color}.svg`),
        iconSize: [16, 16]
    })
}

const createPopUpContent = properties => {
    return `<h3>${properties.name}</h3>
    <p><b>Address</b> : ${properties.address}</p>
    <p><b>Available bikes</b> : ${properties.available_bikes}</p>
    <p><b>Available bike stands</b> : ${properties.available_bike_stands}</p>
    <p><b>Last update</b> : ${properties.last_update}</p>
   `
}
    
const createMarkers = (map, features) => {
    return features.forEach(f => {
        const coordinates = f.geometry.coordinates.reverse()
        const options = { icon: createIcon(f.properties) }
        const popupContent = createPopUpContent(f.properties)
        L.marker(coordinates, options)
        .bindPopup(popupContent)
        .addTo(map)
    })
}

export const useCreateMap = stations => {

    const state = reactive({
        map: null
    })

    onMounted(() => {
        state.map = L.map('map').setView(LYON_LAT_LNG, BASE_ZOOM)
        L.tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
                attribution: 'données © OpenStreetMap/ODbL - rendu OSM France',
                minZoom: 1,
                maxZoom: 20
            }).addTo(state.map)
        createMarkers(state.map, stations)
    })

    return { state }
}