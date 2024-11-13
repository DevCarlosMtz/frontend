<template>
  <v-select
    v-model="vModelValue"
    prepend-inner-icon="mdi-account-group"
    :items="items"
    :error-messages="error"
    :class="error ? 'mb-5' : ''"
    label="Puestos"
    outlined
    item-value="id"
    item-text="puesto"
  />
</template>

<script>
import vModelForComponent from '~/mixins/vModelForComponent.mixin.js'

export default {
  name: 'Puestos',
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
      this.items = await this.$services.puestos.index()
    },
  },

  created() {
    this.obtenerListaPerfiles()
  },
}
</script>
