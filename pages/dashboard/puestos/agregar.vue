<template>
  <div>
    <v-card elevation="10" class="rounded-lg">
      <v-toolbar color="primary">
        <span class="white--text text-md-h4">
          <v-icon left dark large>mdi-account-cog</v-icon> Nuevo Puesto
        </span>
      </v-toolbar>
      <v-card-text class="mt-2">
        <form @submit.prevent="guardar()">
          <v-row>
            <v-col cols="12" sm="12" class="mb-n5">
              <InputText label="Nombre" prependInnerIcon="mdi-card-account-details" v-model="form.puesto"
                :error="errors?.puesto" />
            </v-col>

          </v-row>

          <v-divider class="my-3" />

          <div class="text-right">
            <v-btn color="error" :to="{ name: 'dashboard.usuarios.inicio' }">
              <span>Cancelar</span>
              <v-icon right>mdi-close-thick</v-icon>
            </v-btn>
            <v-btn color="primary" type="submit">
              <span>Guardar</span>
              <v-icon right>mdi-content-save</v-icon>
            </v-btn>
          </div>
        </form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import vForm from 'vform'
import InputText from '~/components/app/globales/InputTextNoRequired.vue'

export default {
  layout: 'dashboard',
  middleware: 'auth',

  head: () => ({
    title: 'Nuevo Puesto',
  }),

  components: {
    InputText,

  },

  data: () => ({
    form: new vForm(),
    errors: [],
  }),

  methods: {
    async guardar() {
      this.$store.dispatch('ui/dialogLoader/open')

      try {
        this.errors = []

        await this.$services.puestos.store(this.form)
        this.form.reset()
        this.$router.push({ name: 'dashboard.puestos.inicio' })
      } catch (error) {
        console.log('Error: guardar()', error)
        this.errors = error?.api?.validationErrors || []
      }

      this.$store.dispatch('ui/dialogLoader/close')
    },
  },
}
</script>
