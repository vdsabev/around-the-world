<template>
  <p v-for="column in columns" :key="column.field">
    <Emoji class="inline-block mr-1" :label="column.label" :symbol="column.symbol" />
    {{ person[column.field] }}
  </p>
</template>

<script>
import { computed } from 'vue'
import { get } from 'lodash'

import settings from '../settings'
import Emoji from './Emoji'

export default {
  components: {
    Emoji,
  },
  props: {
    person: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const columns = computed(() => {
      return settings.infoColumns.filter((column) => get(props.person, column.field))
    })

    return { columns }
  },
}
</script>
