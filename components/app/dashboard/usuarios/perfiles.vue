<template>
  <v-select
    v-model="vModelValue"
    prepend-inner-icon="mdi-account"
    :items="items"
    :error-messages="error"
    :class="error ? 'mb-5' : ''"
    label="Perfiles"
    outlined
    item-value="id"
    item-text="nombre"
  />
</template>

<script>
import vModelForComponent from '~/mixins/vModelForComponent.mixin.js'

export default {
  name: 'Perfiles',
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
      this.items = await this.$services.perfiles.index()
    },
  },

  created() {
    this.obtenerListaPerfiles()
  },
}
</script>
