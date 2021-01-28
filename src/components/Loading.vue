<template>
  <div class="flex justify-center items-center w-full h-full">
    <div
      v-for="n in elements"
      :key="n"
      class="rounded-full w-3 h-3 bg-gray-500 m-1 animate-pulse"
      :style="{ animationDelay: `${n / (elements + 1)}s` }"
    />
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: {
    elements: {
      type: Number,
      default: 4,
    },
  },
}
</script>
