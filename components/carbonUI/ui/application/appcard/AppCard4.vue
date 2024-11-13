<template>
  <div>
    <v-card class="pa-3 mb-5 text-center" @click="verOts()">
      <div class="overline mb-2 text-h6">{{ title }}</div>
      <div class="text-h4">{{ value }} </div>
      <!-- <div>fecha ini {{ fechaIni }}</div> -->
    </v-card>
    <DialogOt ref="dialogOt" :api="api" :title="title" :filtro="filtro" :fechaIni="fechaIni" :fechaFin="fechaFin" />

  </div>
</template>

<script>
import DialogOt from '~/components/app/dashboard/dialogOt.vue'
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    value: {
      type: Number,
    },
    api: {
      type: String,
      default: ''
    },
    filtro: {
      type: Number,
      default: 0
    },
    fechaIni: {
      type: String,
      default: ''
    },
    fechaFin: {
      type: String,
      default: ''
    }

  },
  components: {
    DialogOt
  },
  methods: {
    verOts() {
      this.$refs.dialogOt.open()
    },

  }
}
</script>
