<template>
  <div>
    <v-card elevation="10" class="rounded-lg">
      <v-toolbar color="primary">
        <span class="white--text text-md-h4">
          <v-icon left dark large>mdi-account-circle</v-icon> Perfil
        </span>
      </v-toolbar>

      <v-card-text class="mt-2">
        <form @submit.prevent="actualizar()">
          <v-row>
            <v-col cols="12" sm="6" class="mb-n5">
              <InputText
                label="Nombre"
                prependInnerIcon="mdi-card-account-details"
                v-model="form.nombre"
                :error="errors?.nombre"
                required
              />
            </v-col>

            <v-col cols="12" sm="6" class="mb-n5">
              <InputText
                label="Apellido Paterno"
                prependInnerIcon="mdi-card-account-details-outline"
                v-model="form.ap_pat"
                :error="errors?.ap_pat"
                required
              />
            </v-col>

            <v-col cols="12" sm="6" class="mb-n5">
              <InputText
                label="Apellido Materno"
                prependInnerIcon="mdi-card-account-details-outline"
                v-model="form.ap_mat"
                :error="errors?.ap_mat"
                required
              />
            </v-col>

            <v-col cols="12" sm="6" class="mb-n5">
              <InputEmail
                v-model="form.email"
                :error="errors?.email"
                required
              />
            </v-col>

            <v-col cols="12" sm="6" class="mb-n5">
              <InputPassword
                v-model="form.password"
                :error="errors?.password"
              />
            </v-col>

            <v-col cols="12" sm="6" class="mb-n5">
              <InputPassword
                label="Confirmar Contraseña"
                v-model="form.password_confirmation"
                :error="errors?.password_confirmation"
              />
            </v-col>

            <v-col cols="12" sm="4" class="mb-n5">
              <InputFile
                v-model="form.foto"
                label="Subir foto"
                prependIcon="mdi-camera"
                :error="errors?.foto"
              />
              <div class="text-center mb-5">
                <span class="text--dark text-md-h6">Foto actual</span>
                <br />
                <v-avatar size="140" rounded v-if="fotoPersistente">
                  <img :src="`${storageUrl}/usuarios/${fotoPersistente}`" />
                </v-avatar>
                <v-avatar size="140" color="indigo" rounded v-else>
                  <v-icon dark> mdi-account-circle </v-icon>
                </v-avatar>
              </div>
            </v-col>
          </v-row>

          <v-divider class="my-3" />

          <div class="text-right">
            <v-btn dark color="teal" type="submit">
              <span>Actualizar</span>
              <v-icon right>mdi-pencil</v-icon>
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
import InputFile from '~/components/app/globales/InputFile.vue'

export default {
  layout: 'dashboard',
  middleware: 'auth',

  head: () => ({
    title: 'Perfil',
  }),

  components: {
    InputText,
    InputEmail,
    InputPassword,
    InputFile,
  },

  data: () => ({
    user: null,
    fotoPersistente: null,
    storageUrl: process.env.storageUrl,
    form: new vForm({
      nombre: '',
      ap_pat: '',
      ap_mat: '',
      email: '',
    }),
    errors: [],
  }),

  methods: {
    async actualizar() {
      this.$store.dispatch('ui/dialogLoader/open')

      try {
        this.errors = []
        await this.$services.auth.perfil.actualizar(this.form)
        await this.$auth.fetchUser()
        this.obtenerDatosUsuario()
        this.form.foto = null
      } catch (error) {
        console.error('actualizar()', error)
        this.errors = error?.api?.validationErrors || []
      }

      this.$store.dispatch('ui/dialogLoader/close')
    },

    async obtenerDatosUsuario() {
      this.user = await this.$auth.user
      this.fotoPersistente = this.user?.foto
      this.form.nombre = this.user?.nombre
      this.form.ap_pat = this.user?.ap_pat
      this.form.ap_mat = this.user?.ap_mat
      this.form.email  = this.user?.email
    },
  },

  created() {
    this.obtenerDatosUsuario()
  },
}
</script>
