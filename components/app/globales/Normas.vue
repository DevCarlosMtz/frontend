<template>
  <v-select v-model="vModelValue" :items="items" :error-messages="error" :class="error ? 'mb-5' : ''" :label="label"
    outlined required item-text="text" item-value="value" />
</template>

<script>
import vModelForComponent from '~/mixins/vModelForComponent.mixin.js'

export default {
  name: '',
  mixins: [vModelForComponent],
  props: {
    error: {
      type: Array,
      default: null,
    },
    label: {
      type: String,
      default: 'Label',
    },
  },

  data: () => ({
    items: [
      { text: 'DENTRO DE NORMA', value: '0' },
      { text: 'FUERA DE NORMA', value: '1 ' },
      { text: 'NO APLICA', value: '2' },
    ],
  }),
}
</script>
