<template>
  <v-autocomplete
    v-model="vModelValue"
    prepend-inner-icon="mdi-map-marker"
    :items="items"
    :error-messages="error"
    :class="error ? 'mb-5' : ''"
    label="Area"
    outlined
    item-value="id"
    item-text="nombre_area"
  />
</template>

<script>
import vModelForComponent from '~/mixins/vModelForComponent.mixin.js'

export default {
  name: 'Area',
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
    async obtenerListaArea() {
      this.items = await this.$services.areatrabajo.index()
    },
  },
  created() {
    this.obtenerListaArea()
  },
}
</script>
