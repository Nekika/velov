<template>
  <div id="map"></div>
</template>

<script>
import { useCreateMap } from '../composition/map'

export default {
    props: {
        stations: Array
    },
    setup(props) {
        const { state } = useCreateMap(props.stations)
        return { state }
    }
}
</script>

<style>
#map {
    height: 100%;
    width: 100%;
}
</style>