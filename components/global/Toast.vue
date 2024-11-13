<template>
  <v-snackbar v-model="show" color="primary" elevation="10" bottom>
    <v-icon left>mdi-check-circle</v-icon>
    <span>{{ text }}</span>

    <template v-slot:action="{ attrs }">
      <v-btn color="black" v-bind="attrs" small @click.stop="show = false">
        Cerrar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "Toast",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: Boolean,
      String: "check-circle",
    },
    text: {
      type: String,
      default: "Correcto",
    },
  },
  computed: {
    show: {
      get() {
        return this.visible;
      },
      set(value) {
        if (!value) {
          this.$emit("close");
        }
      },
    },
  },
};
</script>
