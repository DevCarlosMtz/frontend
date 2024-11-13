<template>
  <div>
    <v-card elevation="10" class="rounded-lg">
      <v-toolbar color="primary">
        <span class="white--text text-md-h4">
          <v-icon left dark large>mdi-account-group</v-icon> Nuevo usuario
        </span>
      </v-toolbar>
      <v-card-text class="mt-2">
        <form @submit.prevent="guardar()">
          <v-row>
            <v-col cols="12" sm="6" class="mb-n5">
              <InputText label="Nombre" prependInnerIcon="mdi-card-account-details" v-model="form.nombre"
                :error="errors?.nombre" required />
            </v-col>

            <v-col cols="12" sm="6" class="mb-n5">
              <InputText label="Apellido Paterno" prependInnerIcon="mdi-card-account-details-outline"
                v-model="form.ap_pat" :error="errors?.ap_pat" required />
            </v-col>

            <v-col cols="12" sm="6" class="mb-n5">
              <InputText label="Apellido Materno" prependInnerIcon="mdi-card-account-details-outline"
                v-model="form.ap_mat" :error="errors?.ap_mat" required />
            </v-col>

            <v-col cols="12" sm="6" class="mb-n5">
              <InputEmail v-model="form.email" :error="errors?.email" required />
            </v-col>

            <v-col cols="12" sm="6" class="mb-n5">
              <InputNumber label="Sueldo Diario" prependInnerIcon="mdi-currency-usd" v-model="form.sueldo"
                :error="errors?.sueldo" required />
            </v-col>
            <v-col cols="12" sm="6" class="mb-n5">
              <Empresas v-model="form.id_empresas" :error="errors?.id_empresas" />
            </v-col>
            <v-col cols="12" sm="6" class="mb-n5">
              <Perfiles v-model="form.id_perfiles" :error="errors?.id_perfiles" />
            </v-col>
            <v-col cols="12" sm="6" class="mb-n5">
              <Puestos v-model="form.id_puestos" :error="errors?.id_puestos" />
            </v-col>
            <v-col cols="12" sm="6" class="mb-n5">
              <InputFile v-model="form.foto" label="Subir foto" prependIcon="mdi-camera" :error="errors?.foto" />
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
import InputText from '~/components/app/globales/InputText.vue'
import InputEmail from '~/components/app/globales/InputEmail.vue'
import InputPassword from '~/components/app/globales/InputPassword.vue'
import InputNumber from '~/components/app/globales/InputNumber.vue'
import Empresas from '~/components/app/dashboard/usuarios/empresas.vue'
import Perfiles from '~/components/app/dashboard/usuarios/perfiles.vue'
import Puestos from '~/components/app/globales/Puestos.vue'
import InputFile from '~/components/app/globales/InputFile.vue'

export default {
  layout: 'dashboard',
  middleware: 'auth',

  head: () => ({
    title: 'Nuevo Usuario',
  }),

  components: {
    InputText,
    InputEmail,
    InputPassword,
    InputNumber,
    Empresas,
    Perfiles,
    InputFile,
    Puestos
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

        await this.$services.usuarios.store(this.form)
        this.form.reset()
        this.$router.push({ name: 'dashboard.usuarios.inicio' })
      } catch (error) {
        console.log('Error: guardar()', error)
        this.errors = error?.api?.validationErrors || []
      }

      this.$store.dispatch('ui/dialogLoader/close')
    },
  },
}
</script>
