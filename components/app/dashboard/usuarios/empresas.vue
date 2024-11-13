<template>
  <v-select
    v-model="vModelValue"
    prepend-inner-icon="mdi-domain"
    :items="items"
    :error-messages="error"
    :class="error ? 'mb-5' : ''"
    label="Empresas"
    outlined
    item-value="id"
    item-text="nombre"
  />
</template>

<script>
import vModelForComponent from '~/mixins/vModelForComponent.mixin.js'

export default {
  name: 'Empresas',
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
    async obtenerListaEmpresas() {
      this.items = await this.$services.empresas.index()
    },
  },

  created() {
    this.obtenerListaEmpresas()
  },
}
</script>
