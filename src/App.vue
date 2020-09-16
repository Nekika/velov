<template>
 <Map v-if="state.stations.length > 0" :stations="state.stations" />
 <div v-else>loading...</div>
</template>

<script>
import { useFetchStationsData } from './composition/wfs'

import Map from './components/Map'

export default {
  components: {
    Map
  },
  setup() {
    const { state } = useFetchStationsData()
    return { state }
  }
}
</script>

<style>

</style>
