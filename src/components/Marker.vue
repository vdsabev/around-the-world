<script>
import mapboxgl from 'mapbox-gl'
import { h, onMounted, onUnmounted, provide, ref } from 'vue'

import { useMap } from './Map.vue'
import { lngLat } from './props'

const MARKER_KEY = 'marker'
export const useMarker = () => inject(MARKER_KEY)

export default {
  name: 'Marker',
  props: {
    lngLat,
    options: {
      type: Object,
    },
  },
  setup(props, context) {
    const map = useMap()
    const marker = ref(null)
    const container = ref(null)

    provide(MARKER_KEY, marker)

    onMounted(() => {
      marker.value = new mapboxgl.Marker({ ...props.options, element: container.value })
        .setLngLat(props.lngLat)
        .addTo(map.value)
    })

    onUnmounted(() => {
      if (map.value && marker.value) {
        marker.value.remove()
      }
    })

    return () => h('div', { ...context.attrs, ref: container }, [context.slots.default()])
  },
}
</script>
