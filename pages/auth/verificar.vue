<template>
  <v-container fill-height fluid>
    <v-card width="500" class="rounded-lg mx-auto" elevation="10">
      <v-card-text class="pa-5 mt-3">
        <div class="text-center mb-6">
          <v-avatar class="elevation-5" height="120" width="120">
            <v-icon color="primary" size="80">mdi-shield-lock</v-icon>
          </v-avatar>
          <div class="text-h4 mt-5 black--text">Verifica tu correo</div>
        </div>

        <form @submit.prevent="verify()">
          <v-row>
            <v-col cols="12" sm="12" class="mb-n5">
              <p>Se envio un correo electronico a la dirección : <b>{{ email }}</b> con el código de verificación, favor
                de colocarlo aquí debajo:
              </p>
            </v-col>
            <v-col cols="12" sm="12">
              <codeVerify v-model="form.token" :error="errors?.token" />
            </v-col>

          </v-row>
          <v-divider class="mt-5 my-3" />

          <div class="text-right">
            <v-btn color="primary" type="submit">
              <span>Verificar</span>
              <v-icon right>mdi-check</v-icon>
            </v-btn>
          </div>
        </form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import vForm from 'vform'
import Email from '~/components/app/auth/login/Email.vue'
import Password from '~/components/app/auth/login/Password.vue'
import codeVerify from '~/components/app/auth/login/code.vue'

export default {
  layout: 'auth',
  middleware: 'guest',

  head: () => ({
    title: 'Iniciar Sesión',
  }),

  components: {
    Email,
    Password,
    codeVerify,
  },

  data: () => ({
    form: new vForm(),
    errors: [],
    email: '',
    showPassword: false,
  }),

  methods: {
    async obtenerEmail() {
      this.email = this.$route.params.email
    },
    async verify() {
      this.$store.dispatch('ui/dialogLoader/open')

      try {
        this.errors = []
        await this.$services.usuarios.verificar(this.form)
        this.form.reset()
        await this.$router.push({ name: 'auth.login' })

      } catch (error) {
        console.error('guardar()', error)
        this.errors = error?.api?.validationErrors || []
      }

      this.$store.dispatch('ui/dialogLoader/close')
    },
  },
  created() {
    this.obtenerEmail()
  }
}
</script>
