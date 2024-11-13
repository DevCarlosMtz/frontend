<template>
  <v-dialog
    v-model="dialog"
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
      <v-card-text class="py-3 px-6 body-1 black--text mt-3">
        {{ text }}
      </v-card-text>
      <v-card-actions class="justify-end">
        <v-btn color="grey darken-2" text @click.native="cancel()"
          >Cancelar</v-btn
        >
        <v-btn ref="agreeBtn" color="blue darken-2" text @click.native="agree()"
          >Aceptar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'DialogConfirm',

  data: () => ({
    dialog: false,
    resolve: null,
    reject: null,
    text: null,
    title: '¿Deseas continuar?',
    icon: 'help-circle',
    iconColor: 'blue darken-2',
    options: {
      color: 'primary',
      width: 350,
      zIndex: 400,
    },
  }),

  methods: {
    open(text, question) {
      this.dialog = true

      this.text = text

      if (question !== undefined) {
        this.title = question
      }

      setTimeout(() => {
        this.$refs.agreeBtn.$el.focus()
      })

      return new Promise((resolve, reject) => {
        this.resolve = resolve
        this.reject = reject
      })
    },

    agree() {
      this.resolve(true)
      this.dialog = false
    },

    cancel() {
      this.resolve(false)
      this.dialog = false
    },
  },
}
</script>
