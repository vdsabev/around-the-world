<template>
  <Map class="map" :bounds="bounds">
    <Marker
      v-for="(person, index) in people"
      :key="person.id"
      :lng-lat="person.lngLat"
      :style="{ zIndex: person === selectedPerson ? 1 : 'initial' }"
    >
      <Person
        :person="person"
        :delay="index"
        @click="setSelectedPerson(person)"
        @mouseenter="setSelectedPerson(person)"
        @mouseleave="setSelectedPerson(null)"
      />
    </Marker>

    <Popup
      v-if="selectedPerson"
      :lng-lat="selectedPerson.lngLat"
      :options="{ offset: 32 }"
    >
      <PersonInfo :person="selectedPerson" />
    </Popup>
  </Map>
</template>

<script>
import { computed, ref } from 'vue'
import mapboxgl from 'mapbox-gl'

import * as api from './api'
import Map from './components/Map.vue'
import Marker from './components/Marker.vue'
import Person from './components/Person.vue'
import PersonInfo from './components/PersonInfo.vue'
import Popup from './components/Popup.vue'

export default {
  name: 'App',
  components: {
    Map,
    Marker,
    Person,
    PersonInfo,
    Popup,
  },
  setup() {
    const people = ref([])
    api.getPeople().then((data) => {
      people.value = data
    })

    const selectedPerson = ref(null)
    const setSelectedPerson = (person) => {
      selectedPerson.value = person
    }

    const bounds = computed(() => {
      const coordinates = people.value.map((person) => person.lngLat)
      const minimumNumberOfCoordinates = 2
      if (coordinates.length < minimumNumberOfCoordinates) return null

      const bounds = new mapboxgl.LngLatBounds()
      coordinates.forEach((coordinate) => bounds.extend(coordinate))
      return bounds
    })

    return {
      people,
      selectedPerson,
      setSelectedPerson,
      bounds,
    }
  },
}
</script>

<style>
html,
body,
main,
.map {
  @apply h-full;
}

main {
  @apply font-sans;
  @apply antialiased;
  @apply text-gray-900;
}
</style>
