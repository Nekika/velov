import { reactive, onMounted } from 'vue'
import axios from 'axios'

const API_URL = 'https://download.data.grandlyon.com/wfs/rdata?SERVICE=WFS&VERSION=2.0.0&request=GetFeature&typename=jcd_jcdecaux.jcdvelov&outputFormat=application/json; subtype=geojson&SRSNAME=EPSG:4171&startIndex=0'

export const useFetchStationsData = () => {

    const state = reactive({
        stations: []
    })

    onMounted(async () => {
        const response = await axios.get(API_URL)
        state.stations = response.data.features
    })

    return { state }

}