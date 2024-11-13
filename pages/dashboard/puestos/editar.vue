<template>
  <div>
    <v-card elevation="10" class="rounded-lg">
      <v-toolbar color="primary">
        <span class="white--text text-md-h4">
          <v-icon left dark large>mdi-account-group</v-icon> Editar Puesto

        </span>
      </v-toolbar>
      <v-card-text class="mt-2">
        <form @submit.prevent="actualizar()">
          <v-row>
            <v-col cols="12" sm="12" class="mb-n5">
              <InputText label="Nombre" prependInnerIcon="mdi-card-account-details" v-model="form.puesto"
                :error="errors?.puesto" />
            </v-col>


          </v-row>

          <v-divider class="my-3" />

          <div class="text-right">
            <v-btn color="error" :to="{ name: 'dashboard.puestos.inicio' }">
              <span>Cancelar</span>
              <v-icon right>mdi-close-thick</v-icon>
            </v-btn>
            <v-btn color="primary" type="submit">
              <span>Actualizar</span>
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
    title: 'Editar Puesto',
  }),

  components: {
    InputText,

  },

  data: () => ({
    form: new vForm({
      id: '',
      puesto: '',

    }),
    errors: [],
  }),

  methods: {
    async obtenerPuesto() {
      this.$store.dispatch('ui/dialogLoader/open')

      try {
        let puesto = await this.$services.puestos.show({
          id: this.$route.params.idPuesto,
        })

        this.form.fill(puesto)
      } catch (error) {
        console.error('obtenerPuesto()', error)
      }

      this.$store.dispatch('ui/dialogLoader/close')
    },

    async actualizar() {
      this.$store.dispatch('ui/dialogLoader/open')

      try {
        await this.$services.puestos.update(this.form)
        await this.$router.push({ name: 'dashboard.puestos.inicio' })
      } catch (error) {
        console.error('actualizar()', error)
        this.errors = error?.api?.validationErrors || []
      }

      this.$store.dispatch('ui/dialogLoader/close')
    },
  },

  /**
   * Lifecycle hooks
   */
  created() {
    this.obtenerPuesto()
  },
}
</script>
