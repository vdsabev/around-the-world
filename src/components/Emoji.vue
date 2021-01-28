<template>
  <span role="img" :aria-label="label" :aria-hidden="!label">{{ symbol }}</span>
</template>

<script>
export default {
  name: 'Emoji',
  props: {
    label: {
      type: String,
      required: true,
    },
    symbol: {
      type: String,
      required: true,
    },
  },
}
</script>
