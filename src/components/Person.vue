<template>
  <div
    class="person"
    :style="{
      animationDelay: `${delay * staggerDuration}ms`,
      backgroundImage: `url('${person.pictureUrl}')`,
    }"
    @click="zoomToPerson"
  />
</template>

<script>
import { useMap } from './Map.vue'
export default {
  name: 'Person',
  props: {
    person: {
      type: Object,
      required: true,
    },
    delay: {
      type: Number,
      default: 0,
    },
  },
  emits: ['click'],
  setup(props, context) {
    const map = useMap()
    const zoomToPerson = ($event) => {
      context.emit('click', $event)
      const minimumZoomLevel = 6
      const zoomSpeed = 2
      map.value.flyTo({
        center: props.person.lngLat,
        zoom: Math.max(map.value.getZoom() + 1, minimumZoomLevel),
        speed: zoomSpeed,
      })
    }

    return {
      staggerDuration: 100,
      zoomToPerson,
    }
  },
}
</script>

<style scoped>
.person {
  transform: scale(0);
  @apply animate-scale-in;

  @apply cursor-pointer;

  @apply border-2;
  @apply border-white;
  @apply rounded-full;
  @apply w-16;
  @apply h-16;

  @apply bg-white;
  @apply bg-center;
  @apply bg-no-repeat;
  @apply bg-cover;

  filter: grayscale(100%) brightness(120%);
  transition-property: filter;
  @apply duration-200;
  @apply ease-in-out;
}

.person:hover {
  filter: grayscale(0);
}
</style>
