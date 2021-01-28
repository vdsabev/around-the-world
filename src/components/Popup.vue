<script>
import mapboxgl from 'mapbox-gl'
import { h, onMounted, onUnmounted, provide, ref } from 'vue'

import { useMap } from './Map.vue'
import { lngLat } from './props'

const POPUP_KEY = 'popup'
export const usePopup = () => inject(POPUP_KEY)

export default {
  name: 'Popup',
  props: {
    lngLat,
    options: {
      type: Object,
    },
  },
  setup(props, context) {
    const map = useMap()
    const popup = ref(null)
    const container = ref(null)

    provide(POPUP_KEY, popup)

    onMounted(() => {
      popup.value = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
        ...props.options,
      })
        .setDOMContent(container.value)
        .setLngLat(props.lngLat)
        .addTo(map.value)
    })

    onUnmounted(() => {
      if (map.value && popup.value) {
        popup.value.remove()
      }
    })

    return () => h('div', { ...context.attrs, ref: container }, [context.slots.default()])
  },
}
</script>
