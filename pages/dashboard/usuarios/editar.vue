<template>
  <div>
    <v-card elevation="10" class="rounded-lg">
      <v-toolbar color="primary">
        <span class="white--text text-md-h4">
          <v-icon left dark large>mdi-account-group</v-icon> Editar usuario
          {{ form.id }}
        </span>
      </v-toolbar>
      <v-card-text class="mt-2">
        <form @submit.prevent="actualizar()">
          <v-row>
            <v-col cols="12" sm="6" class="mb-n5">
              <InputText label="Nombre" prependInnerIcon="mdi-card-account-details" v-model="form.nombre"
                :error="errors?.nombre" required />
            </v-col>

            <v-col cols="12" sm="6" class="mb-n5">
              <InputText label="Modelo" prependInnerIcon="mdi-card-account-details-outline"
                v-model="form.ap_pat" :error="errors?.ap_pat" required />
            </v-col>

            <v-col cols="12" sm="6" class="mb-n5">
              <InputText label="Tipo" prependInnerIcon="mdi-card-account-details-outline"
                v-model="form.ap_mat" :error="errors?.ap_mat" required />
            </v-col>



            <v-col cols="12" sm="6" class="mb-n5">
              <InputPassword label="Confirmar Contraseña" v-model="form.password_confirmation"
                :error="errors?.password_confirmation" />
            </v-col>

            <v-col cols="12" sm="6" class="mb-n5">
              <InputNumber label="Sueldo" prependInnerIcon="mdi-currency-usd" v-model="form.sueldo"
                :error="errors?.sueldo" required />
            </v-col>
            <v-col cols="12" sm="6" class="mb-n5">
              <Perfiles v-model="form.id_perfiles" :error="errors?.id_perfiles" />
            </v-col>
            <v-col cols="12" sm="6" class="mb-n5">
              <Puestos v-model="form.id_puestos" :error="errors?.id_puestos" />
            </v-col>
            <v-col cols="12" sm="6" class="mb-n5">
              <InputFile v-model="form.foto" label="Subir foto" prependIcon="mdi-camera" :error="errors?.foto" />
              <div class="text-center mb-5">
                <span class="text--dark text-md-h6">Foto actual</span>
                <br />


              </div>
            </v-col>
          </v-row>

          <v-divider class="my-3" />

          <div class="text-right">
            <v-btn color="error" :to="{ name: 'dashboard.usuarios.inicio' }">
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
import InputText from '~/components/app/globales/InputText.vue'
import InputEmail from '~/components/app/globales/InputEmail.vue'
import InputPassword from '~/components/app/globales/InputPassword.vue'
import InputNumber from '~/components/app/globales/InputNumber.vue'
import Empresas from '~/components/app/dashboard/usuarios/empresas.vue'
import Perfiles from '~/components/app/dashboard/usuarios/perfiles.vue'
import InputFile from '~/components/app/globales/InputFile.vue'
import Puestos from '~/components/app/globales/Puestos.vue'

export default {
  layout: 'dashboard',
  middleware: 'auth',

  head: () => ({
    title: 'Editar Usuario',
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
    storageUrl: process.env.storageUrl,
    fotoPersistente: null,
    form: new vForm({
      id: '',
      foto:'',
      nombre: '',
      ap_pat: '',
      ap_mat: '',
      email: '',
      sueldo: '',
      id_perfiles: '',
      id_puestos: '',
      id_empresas: ''
    }),
    errors: [],
  }),

  methods: {
    async obtenerUsuario() {
      this.$store.dispatch('ui/dialogLoader/open')

      try {
        let usuario = await this.$services.usuarios.show({
          id: this.$route.params.idUsuario,
        })

        this.fotoPersistente = usuario?.foto || null
        this.form.fill(usuario)
      } catch (error) {
        console.error('obtenerUsuario()', error)
      }

      this.$store.dispatch('ui/dialogLoader/close')
    },

    async actualizar() {
      this.$store.dispatch('ui/dialogLoader/open')

      try {
        await this.$services.usuarios.update(this.form)
        await this.$router.push({ name: 'dashboard.usuarios.inicio' })
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
    this.obtenerUsuario()
  },
}
</script>
