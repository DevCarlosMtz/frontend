
<template>
  <div>
    <v-card elevation="10" class="rounded-lg">
      <v-toolbar color="primary">
        <span class="white--text text-md-h4">
          <v-icon left dark large>mdi-domain</v-icon> Editar Empresa
        </span>
      </v-toolbar>
      <v-card-text class="mt-2">
        <form @submit.prevent="actualizar()">
          <v-row>

            <v-col cols="12" sm="6" class="mb-n5">
              <InputText label="Nombre" prependInnerIcon="mdi-card-account-details" v-model="form.nombre"
                :error="errors?.nombre" />
            </v-col>
            <v-col cols="12" sm="6" class="mb-n5">
              <InputText label="RFC" prependInnerIcon="mdi-account-card" v-model="form.rfc" :error="errors?.rfc" />
            </v-col>
            <v-col cols="12" sm="6" class="mb-n5">

              <InputText label="Responsable" prependInnerIcon="mdi-account-box" v-model="form.responsable"
                :error="errors?.responsable" />
            </v-col>
            <v-col cols="12" sm="6" class="mb-n5">
              <InputText label="Domicilio Fiscal" prependInnerIcon="mdi-home-city" v-model="form.domicilio_fiscal"
                :error="errors?.domicilio_fiscal" />
            </v-col>
            <v-col ols="12" sm="6" class="mb-n5">

              <InputText label="Pagina Web" prependInnerIcon="mdi-web" v-model="form.dominio"
                :error="errors?.dominio" />
            </v-col>
            <v-col cols="12" sm="6" class="mb-n5">
              <InputText label="Aviso Privacidad" prependInnerIcon="mdi-file-document-multiple"
                v-model="form.aviso_privacidad" :error="errors?.aviso_privacidad" />
            </v-col>
            <v-col cols="12" sm="6" class="mb-n5">
              <InputNumber label="Teléfono" prependInnerIcon="mdi-phone" v-model="form.telefono"
                :error="errors?.telefono" />
            </v-col>

            <v-col cols="12" sm="4" class="mb-n5">
              <InputFile v-model="form.foto" label="Subir foto" prependIcon="mdi-camera" :error="errors?.foto" />
              <div class="text-center mb-5">
                <span class="text--dark text-md-h6">Foto actual</span>
                <br />
                <v-avatar size="140" rounded v-if="fotoPersistente">
                  <img :src="`${storageUrl}/empresas/${fotoPersistente}`" />
                </v-avatar>
                <v-avatar size="140" color="indigo" rounded v-else>
                  <v-icon dark> mdi-account-circle </v-icon>
                </v-avatar>
              </div>
            </v-col>

          </v-row>
          <div class="text-right">
            <v-btn color="error" :to="{ name: 'dashboard.empresas.inicio' }">
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
<style scoped>

</style>

<script>
import vForm from 'vform'
import InputText from '~/components/app/globales/InputTextNoRequired.vue'
import InputEmail from '~/components/app/globales/InputEmail.vue'
import InputPassword from '~/components/app/globales/InputPassword.vue'
import InputNumber from '~/components/app/globales/InputNumber.vue'
import InputFile from '~/components/app/globales/InputFile.vue'

export default {
  layout: 'dashboard',
  middleware: 'auth',

  head: () => ({
    title: 'Editar Empresa',
  }),

  components: {
    InputText,
    InputEmail,
    InputPassword,
    InputNumber,
    InputFile
  },

  data: () => ({
    storageUrl: process.env.storageUrl,

    form: new vForm({
      id: '',
      nombre: '',
      rfc: '',
      responsable: '',
      domicilio_fiscal: '',


      telefono: '',
    }),
    errors: [],
  }),

  methods: {
    async obtenerEmpresa() {
      this.$store.dispatch('ui/dialogLoader/open')

      try {
        let empresa = await this.$services.empresas.show({
          id: this.$route.params.idEmpresa,
        })

        this.fotoPersistente = empresa?.foto || null
        this.form.fill(empresa)
      } catch (error) {
        console.error('obtenerEmpresa()', error)
      }

      this.$store.dispatch('ui/dialogLoader/close')
    },

    async actualizar() {
      this.$store.dispatch('ui/dialogLoader/open')

      try {
        await this.$services.empresas.update(this.form)
        await this.$router.push({ name: 'dashboard.empresas.inicio' })
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
    this.obtenerEmpresa()
  },
}
</script>
