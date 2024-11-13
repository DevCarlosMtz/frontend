<template>
  <v-select
    v-model="vModelValue"
    prepend-inner-icon="mdi-credit-card-outline"
    :items="items"
    :error-messages="error"
    :class="error ? 'mb-5' : ''"
    label="Orden de Trabajo"
    outlined
    item-value="id"
    item-text="ot"
  />
</template>

<script>
import vModelForComponent from '~/mixins/vModelForComponent.mixin.js'

export default {
  name: 'Ordenes',
  mixins: [vModelForComponent],
  props: {
    error: {
      type: Array,
      default: null,
    },
  },

  data: () => ({
    items: [],
  }),

  methods: {
    async obtenerListaPerfiles() {
      this.items = await this.$services.ordenes.index()
    },
  },

  created() {
    this.obtenerListaPerfiles()
  },
}
</script>
