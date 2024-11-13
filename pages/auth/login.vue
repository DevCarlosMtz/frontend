<template>
  <v-container fill-height fluid>
    <v-card width="500" class="rounded-lg mx-auto" elevation="10">
      <v-card-text class="pa-5 mt-3">
        <div class="text-center mb-6">
          <v-avatar class="elevation-5" height="120" width="120">
            <v-img :src="require('static/images/avatar.png')" />
          </v-avatar>
          <div class="text-h4 mt-5 black--text">Inicia Sesión</div>
        </div>

        <form @submit.prevent="login()">
          <v-row>
            <v-col cols="12" sm="12" class="mb-n5">

              <Email v-model="form.email" :error="errors.email" />
            </v-col>
            <v-col cols="12" sm="12" class="mb-n5">
              <Password v-model="form.password" :error="errors.password" />
            </v-col>
            <v-col cols="12" sm="12" class="mb-n5">
              <v-checkbox class="my-n3" label="Recordar Sesión" color="indigo" v-model="form.remember" />
            </v-col>
            <v-col cols="12" sm="12" class="mb-n5">
              <span>¿Tu empresa no tiene cuenta?</span>
              <v-btn text small color="primary" class="my-n3" :to="{ name: 'auth.register' }">
                <span>Regístrala aquí</span>
              </v-btn>
            </v-col>
          </v-row>
          <v-divider class="mt-5 my-3" />

          <div class="text-right">
            <v-btn color="primary" type="submit">
              <span>Acceder</span>
              <v-icon right>mdi-login</v-icon>
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

export default {
  layout: 'auth',
  middleware: 'guest',

  head: () => ({
    title: 'Iniciar Sesión',
  }),

  components: {
    Email,
    Password,
  },

  data: () => ({
    form: new vForm({
      remember: true
    }),
    errors: [],
    showPassword: false,
  }),

  methods: {
    async login() {
      this.$store.dispatch('ui/dialogLoader/open')

      try {
        this.errors = []
        await this.$auth
          .loginWith('laravelJWT', {
            data: this.form,
          })
          .then(async () => {
            if (this.form.remember) {
              await console.log('remember me active')
              let authRefreshToken = this.$cookies.get('auth.refresh_token.local')
              let authTokenLocal = this.$cookies.get('auth._token.local')
              let authStrategy = this.$cookies.get('auth.strategy')
              let expire = process.env.APP_COOKIE_EXPIRE || 0
              this.$cookies.set('auth.refresh_token.local', authRefreshToken, 60 * 60 * 24 * expire)
              this.$cookies.set('auth._token.local', authTokenLocal, 60 * 60 * 24 * expire)
              this.$cookies.set('auth.strategy', authStrategy, 60 * 60 * 24 * expire)
            }

            this.$router.push({ name: 'dashboard.index' })
          })
      } catch (error) {
        this.errors = error?.api?.validationErrors || []
      }

      this.$store.dispatch('ui/dialogLoader/close')
    },
  },
}
</script>
