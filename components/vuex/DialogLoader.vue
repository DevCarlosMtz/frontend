<template>
  <v-dialog v-model="dialogLoaderData.activo" persistent width="200" :style="{ zIndex: 99999 }">
    <v-card color="primary" class="rounded-lg" dark>
      <v-card-text class="ma-0 pa-0">
        <v-container class="text-center pa-7">
          <v-progress-circular
            indeterminate
            color="white"
            size="50"
            width="6"
          ></v-progress-circular>
        </v-container>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogLoader',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      default: 'Cargando',
    },
  },

  computed: {
    dialogLoaderData() {
      return this.$store.getters['ui/dialogLoader/getData'];
    },
  }
}
</script>
