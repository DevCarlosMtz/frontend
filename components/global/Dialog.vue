<template>
  <v-row justify="center">
    <v-dialog
      v-model="show"
      :width="width"
      transition="dialog-bottom-transition"
      persistent
    >
      <v-card>
        <v-toolbar :color="titleColor" flat>
          <v-toolbar-title class="text-h5">
            <v-icon :color="iconColor" left>{{ icon }}</v-icon>
            <span class="white--text">{{ title }}</span>
          </v-toolbar-title>
        </v-toolbar>
        <v-card-text class="pa-2 body-1 black--text mt-3">
          <slot />
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    width: {
      type: Number,
      default: 600,
    },
    title: {
      type: String,
      default: 'Titulo',
    },
    titleColor: {
      type: String,
      default: 'primary',
    },
    icon: {
      type: String,
      default: 'mdi-emoticon-outline',
    },
    iconColor: {
      type: String,
      default: 'white',
    },
  },
}
</script>
