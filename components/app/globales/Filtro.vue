<template>
  <v-select v-model="vModelValue" prepend-inner-icon="mdi-filter" :items="items" :error-messages="error"
    :class="error ? 'mb-5' : ''" label="Filtro" solo item-value="id" item-text="text" />
</template>

<script>
import vModelForComponent from '~/mixins/vModelForComponent.mixin.js'

export default {
  name: 'Filtro',
  mixins: [vModelForComponent],
  props: {
    error: {
      type: Array,
      default: null,
    },
  },

  data: () => ({
    items: [
      { id: 1, text: 'Mes actual' },
      { id: 2, text: '6 meses' },
      { id: 3, text: '1 año' },
      { id: 4, text: 'Personalizado' }
    ],
  }),

}
</script>
