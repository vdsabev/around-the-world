<template>
  <Map class="map" :bounds="bounds">
    <Marker
      v-for="(person, index) in people"
      :key="person.id"
      :lng-lat="person.lngLat"
      :options="{ offset: [person.offset, -person.offset] }"
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
      :options="{
        offset: [selectedPerson.offset, -(0.5 * avatarSizeInPx + selectedPerson.offset)],
      }"
    >
      <PersonInfo :person="selectedPerson" />
    </Popup>
  </Map>
</template>

<script>
import { computed, ref } from 'vue'
import mapboxgl from 'mapbox-gl'

import Map from './components/Map.vue'
import Marker from './components/Marker.vue'
import Person from './components/Person.vue'
import PersonInfo from './components/PersonInfo.vue'
import Popup from './components/Popup.vue'

import * as api from './api'
import settings from './settings'
import { getOffset } from './utils'

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
    const { avatarSizeInPx } = settings.person
    const people = ref([])
    api.getPeople().then((data) => {
      people.value = data.map((person, index) => {
        const previousPeople = data.slice(0, index)
        const offset =
          0.33 *
          avatarSizeInPx *
          getOffset(
            person.lngLat,
            previousPeople.map((p) => p.lngLat),
          )

        return { ...person, offset }
      })
    })

    const selectedPerson = ref(null)
    const setSelectedPerson = (person) => {
      selectedPerson.value = person
    }

    const coordinates = computed(() => people.value.map((person) => person.lngLat))

    const bounds = computed(() => {
      const minimumNumberOfCoordinates = 2
      if (coordinates.value.length < minimumNumberOfCoordinates) return null

      const bounds = new mapboxgl.LngLatBounds()
      coordinates.value.forEach((coordinate) => bounds.extend(coordinate))
      return bounds
    })

    return {
      avatarSizeInPx,
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
