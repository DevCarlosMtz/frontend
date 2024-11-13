<template>
  <v-container fill-height fluid>
    <v-card width="600" class="rounded-lg mx-auto" elevation="10">
      <v-card-text class="pa-5 mt-3">
        <div class="text-center mb-6">
          <v-avatar class="elevation-5" height="120" width="120">
            <v-img :src="require('static/images/auth/factory.png')" />
          </v-avatar>
          <div class="text-h4 mt-5 black--text">Registra a tu empresa</div>
        </div>

        <form @submit.prevent="guardar()">
          <v-row>
            <v-col cols="12" sm="12" class="mb-n5">
              <InputFile label="Agregar logo de la empresa" prependInnerIcon="mdi-card-account-details"
                v-model="form.foto" :error="errors?.foto" />
            </v-col>
            <v-col cols="12" sm="6" class="mb-n5">
              <InputText label="Nombre" prependInnerIcon="mdi-card-account-details" v-model="form.nombre"
                :error="errors?.nombre" />
            </v-col>
            <v-col cols="12" sm="6" class="mb-n5">
              <InputText label="RFC" prependInnerIcon="mdi-account-card" v-model="form.rfc" :error="errors?.rfc" />
            </v-col>

            <v-col cols="12" sm="6" class="mb-n5">
              <InputText label="Domicilio Fiscal" prependInnerIcon="mdi-home-city" v-model="form.domicilio_fiscal"
                :error="errors?.domicilio_fiscal" />
            </v-col>
            <v-col ols="12" sm="6" class="mb-n5">

              <InputText label="Pagína Web" prependInnerIcon="mdi-web" v-model="form.dominio" :error="errors?.dominio" />
            </v-col>
            <v-col cols="12" sm="6" class="mb-n5">
              <InputText label="Aviso Privacidad (Link)" prependInnerIcon="mdi-file-document-multiple"
                v-model="form.aviso_privacidad" :error="errors?.aviso_privacidad" />
            </v-col>
            <v-col cols="12" sm="6" class="mb-n5">
              <InputNumber label="Teléfono" prependInnerIcon="mdi-phone" v-model="form.telefono"
                :error="errors?.telefono" />
            </v-col>
            <v-col cols="12" sm="12" class="mb-n5">
              <div class="text-center mb-6">
                <div class="text-h4 mt-5 black--text">Datos del Responsable</div>
              </div>
            </v-col>
            <v-col cols="12" sm="6" class="mb-n5">
              <InputText label="Nombre" prependInnerIcon="mdi-account-box" v-model="form.responsable"
                :error="errors?.responsable" />
            </v-col>
            <v-col cols="12" sm="6" class="mb-n5">
              <InputText label="Apellido Paterno" prependInnerIcon="mdi-account-box" v-model="form.ap_pat"
                :error="errors?.ap_pat" />
            </v-col>
            <v-col cols="12" sm="6" class="mb-n5">
              <InputText label="Apellido Materno" prependInnerIcon="mdi-account-box" v-model="form.ap_mat"
                :error="errors?.ap_mat" />
            </v-col>
            <v-col cols="12" sm="6" class="mb-n5">
              <InputEmail label="Correo" prependInnerIcon="mdi-email" v-model="form.email" :error="errors?.email" />
            </v-col>
            <v-col cols="12" sm="6" class="mb-n5">
              <InputPassword v-model="form.password" :error="errors?.password" />
            </v-col>

            <v-col cols="12" sm="6" class="mb-n5">
              <InputPassword label="Confirmar Contraseña" v-model="form.password_confirmation"
                :error="errors?.password_confirmation" />
            </v-col>

          </v-row>
          <v-divider class="my-3" />
          <v-row class="mb-5">
            <v-col cols="12" sm="12" class="mb-n5">
              <div class="text-right">
                <v-btn color="primary" type="submit">
                  <span>Acceder</span>
                  <v-icon right>mdi-login</v-icon>
                </v-btn>
              </div>
            </v-col>
            <v-col cols="12" sm="12" class="mb-n5">
              <span>¿Ya tienes una cuenta?</span>
              <v-btn text small color="primary" class="my-n3" :to="{ name: 'auth.login' }">
                <span>Inicia sesión aquí</span>
              </v-btn>
            </v-col>
          </v-row>


        </form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import vForm from 'vform'
import InputEmail from '~/components/app/globales/InputEmail.vue'
import InputPassword from '~/components/app/globales/InputPassword.vue'
import InputText from '~/components/app/globales/InputTextNoRequired.vue'
import InputNumber from '~/components/app/globales/InputNumber.vue'
import InputFile from '~/components/app/globales/InputFile.vue'

export default {
  layout: 'auth',
  middleware: 'guest',

  head: () => ({
    title: 'Registrarse',
  }),

  components: {
    InputEmail,
    InputPassword,
    InputText,
    InputNumber,
    InputFile,

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
        await this.$services.empresas.store(this.form)
        this.form.reset()
        this.$router.push({ name: 'auth.login' })

      } catch (error) {
        console.error('Error: guardar()', error)
        this.errors = error?.api?.validationErrors || []
      }

      this.$store.dispatch('ui/dialogLoader/close')
    },
  },
}
</script>
