<template>
  <v-dialog
    v-model="dialogAlertData.activo"
    :max-width="options.width"
    :style="{ zIndex: options.zIndex }"
    persistent
  >
    <v-card>
      <v-toolbar class="pt-3" flat>
        <v-toolbar-title class="text-h5">
          <v-icon :color="iconColor" left>mdi-{{ icon }}</v-icon>
          <span class="black--text">{{ title }}</span>
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text class="py-2 pt-4 pb-4 body-1 black--text mt-3">
        {{ dialogAlertData.text }}
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn
          ref="aceptarBtn"
          color="blue darken-2"
          text
          @click.native="cerrar()"
        >
          Aceptar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogAlert',

  data: () => ({
    dialog: false,
    title: null,
    icon: null,
    iconColor: null,
    options: {
      color: 'primary',
      width: 350,
      zIndex: 400,
    },
  }),

  computed: {
    dialogAlertData() {
      let data = this.$store.getters['ui/dialogAlert/getData']
      this.asignarValores(data)
      return data
    },
  },

  methods: {
    asignarValores(dialogAlertData) {
      switch (dialogAlertData.type) {
        case 'success':
          this.title = 'Correcto'
          this.icon = 'check-circle'
          this.iconColor = 'green'
          break

        case 'error':
          this.title = 'Ocurrió un error'
          this.icon = 'alert-circle'
          this.iconColor = 'red'
          break

        case 'warning':
          this.title = 'Advertencia'
          this.icon = 'alert'
          this.iconColor = 'orange'
          break

        case 'info':
          this.title = 'Información'
          this.icon = 'information'
          this.iconColor = 'blue'
          break
      }
    },
    cerrar() {
      this.$store.dispatch('ui/dialogAlert/close')
    },
  },
}
</script>
