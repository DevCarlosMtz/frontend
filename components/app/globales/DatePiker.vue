<template>
  <div v-show="filtro == 4">
    <v-menu v-model="menu" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y
      min-width="290px">
      <template v-slot:activator="{ on, attrs }">
        <v-text-field v-model="vModelValue" :label="label" prepend-icon="mdi-calendar" readonly v-bind="attrs"
          v-on="on"></v-text-field>
      </template>
      <v-date-picker v-model="vModelValue" @input="menu = false"></v-date-picker>
    </v-menu>
  </div>
</template>

<script>
import vModelForComponent from '~/mixins/vModelForComponent.mixin.js'

export default {
  name: 'DatePiker',
  mixins: [vModelForComponent],
  props: {
    error: {
      type: Array,
      default: null,
    },
    label: {
      type: String,
      default: 'Fecha',
    },
    filtro: {
      type: Number,
      default: 0,
    },
  },

  data: () => ({
    menu: false,
  }),

}
</script>
