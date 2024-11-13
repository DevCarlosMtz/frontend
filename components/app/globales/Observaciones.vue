<template>
  <div>

    <v-row>
      <v-col cols="12" sm="12" class="mb-n4">
        <v-card class="mx-auto" v-if="items.length != 0">
          <template class="mx-auto">
            <div class="text-center mt-10">
              <br />
              <h2 class="">Observaciones</h2>
              <br />
              <div class="mt-5" v-if="items.length > 0">
                <v-btn v-if="limitO == true" color="success" class="mb-4" @click="verMas()">
                  <v-icon left>mdi-eye</v-icon>
                  <span>Ver mas</span>
                </v-btn>
                <v-btn v-if="limitO == false" color="error" class="mb-4" @click="verMas()">
                  <v-icon left>mdi-eye</v-icon>
                  <span>Ver menos</span>
                </v-btn>
              </div>
            </div>
            <v-timeline class="ma-2">
              <v-timeline-item v-for="(item, key) in items" :key="item.id" v-if="key <= limit" large>
                <template v-slot:icon>
                  <v-avatar rounded size="32" v-if="item?.usuario.foto">
                    <img :src="`${storageUrl}/usuarios/${item.usuario.foto}`" />
                  </v-avatar>
                  <v-avatar rounded size="32" color="indigo" v-else>
                    <v-icon dark> mdi-account-circle </v-icon>
                  </v-avatar>
                </template>
                <template v-slot:opposite>
                  <!-- <span>{{ item.created_at }}</span> -->
                </template>
                <v-card class="elevation-2">
                  <v-card-title class="headline">{{
                    item.usuario.nombre_completo
                  }}</v-card-title>
                  <v-card-text>{{ item.texto }}</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn v-if="item.id_usuario == user.id" class="mx-2" fab dark x-small color="error"
                      @click="eliminarObservacion(item.id)">
                      <v-icon dark> mdi-delete </v-icon>
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-timeline-item>
            </v-timeline>
          </template>
        </v-card>
      </v-col>
    </v-row>
    <dialog-confirm ref="dialogConfirm" />
  </div>
</template>
<script>



export default {
  name: 'Observaciones',
  props: {
    tipo: {
      type: String,
      default: null,
    },
    disk: {
      type: String,
      default: null,
    },
    ot: {
      type: String,
      default: null,
    },


  },

  data: () => ({
    storageUrl: process.env.storageUrl,
    user: {},
    items: [],
    limit: 1,
    limitO: true,
  }),

  methods: {
    verMas() {
      if (this.limitO == false) {
        this.limit = 1
        this.limitO = !this.limitO
      }
      else {
        this.limit = this.items.length
        this.limitO = !this.limitO
      }
    },

    async obtenerObservaciones() {
      this.$store.dispatch('ui/dialogLoader/open')

      try {
        this.items = await this.$services.observaciones.showComments({
          ot: this.ot,
          tipo: this.tipo,
        })
      } catch (error) {
        console.error('obtenerObservaciones()', error)
      }

      this.$store.dispatch('ui/dialogLoader/close')
    },
    async eliminarObservacion(idObservacion) {
      const CONFIRMACION = await this.$refs.dialogConfirm.open(
        `Estás a punto de eliminar el comentario`
      )
      if (CONFIRMACION) {
        this.$store.dispatch('ui/dialogLoader/open')

        try {
          await this.$services.observaciones.destroy({
            id: idObservacion,
          })

          await this.obtenerObservaciones()
        } catch (error) {
          console.error('eliminarObservacion()', error)
        }

        this.$store.dispatch('ui/dialogLoader/close')
      }
    },

    resetFoto() {
      this.form.fotos = []
    },


  },
  created() {
    this.user = this.$auth.user;
    this.obtenerObservaciones()
  },

}
</script>
