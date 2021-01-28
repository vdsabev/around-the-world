<script>
import { h, inject, onMounted, onUnmounted, provide, ref, watch } from 'vue'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

import settings from '../settings'

const MAP_KEY = 'map'
export const useMap = () => inject(MAP_KEY)

export default {
  name: 'Map',
  props: {
    bounds: {
      type: Object,
    },
  },
  setup(props, context) {
    const containerVNode = ref(null)
    const container = ref(null)

    const map = ref(null)
    provide(MAP_KEY, map)

    onMounted(() => {
      mapboxgl.accessToken = settings.mapbox.accessToken

      const mapInstance = new mapboxgl.Map({
        ...settings.mapbox.options,
        container: container.value,
      })

      mapInstance.addControl(new mapboxgl.NavigationControl({ showCompass: false }))

      map.value = mapInstance
    })

    watch(
      () => props.bounds,
      () => {
        if (props.bounds) {
          map.value?.fitBounds(props.bounds, { padding: 64 })
        }
      },
    )

    onUnmounted(() => {
      map.value?.remove()
    })

    return () => {
      if (!containerVNode.value) {
        containerVNode.value = h('div', { ...context.attrs, ref: container })
      }

      return h('div', [
        containerVNode.value,
        h('div', { style: { display: 'none' } }, [context.slots.default()]),
      ])
    }
  },
}
</script>
