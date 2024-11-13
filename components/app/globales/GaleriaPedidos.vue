<template>
  <div>
    <div class="mt-5 mx-auto ml-4" v-if="items.length > 4">
      <v-btn v-if="limitG == true" color="success" class="mb-4" @click="verMas()">
        <v-icon left>mdi-eye</v-icon>
        <span>Ver mas</span>
      </v-btn>
      <v-btn v-if="limitG == false" color="error" class="mb-4" @click="verMas()">
        <v-icon left>mdi-eye</v-icon>
        <span>Ver menos</span>
      </v-btn>
    </div>
    <v-row class="mr-1 ml-1">
      <v-col cols="12" sm="3" class="mb-n4 mx-auto" v-for="(item, key) in items" :key="item.id" v-if="key <= limit">
        <v-card class="mb-5 mt-5 text-center">
          <v-img :src="`${storageUrl}/${disk}/${item.imagen}`" class="align-end"
            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="150px" cover>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="mx-2" fab dark small color="error" @click="eliminarImagen(item.id)">
                <v-icon dark> mdi-delete </v-icon>
              </v-btn>
            </v-card-actions>
          </v-img>
        </v-card>
      </v-col>
    </v-row>
    <dialog-confirm ref="dialogConfirm" />
  </div>
</template>
<script>



export default {
  name: 'GaleriaPedidos',
  props: {
    tipo_imagen: {
      type: String,
      default: null,
    },
    disk: {
      type: String,
      default: null,
    },
  },

  data: () => ({

    storageUrl: process.env.storageUrl,
    items: [],
    limit: 3,
    limitG: true,
  }),

  methods: {
    verMas() {
      if (this.limitG == false) {
        this.limit = 3
        this.limitG = !this.limitG
      }
      else {
        this.limit = this.items.length
        this.limitG = !this.limitG
      }
    },
    async obtenerGaleria() {
      this.$store.dispatch('ui/dialogLoader/open')
      try {
        this.items = await this.$services.galeria.showGalery({
          tipo_imagen: this.tipo_imagen,
        })
      } catch (error) {
        console.error('obtenerGaleria()', error)
      }
      this.$store.dispatch('ui/dialogLoader/close')
    },

    async eliminarImagen(idImagen) {
      const CONFIRMACION = await this.$refs.dialogConfirm.open(
        `Estás a punto de eliminar la Imagen`
      )
      if (CONFIRMACION) {
        this.$store.dispatch('ui/dialogLoader/open')

        try {
          await this.$services.galeria.destroy({
            id: idImagen,
          })

          await this.obtenerGaleria()
        } catch (error) {
          console.error('eliminarImagen()', error)
        }

        this.$store.dispatch('ui/dialogLoader/close')
      }
    },

    resetFoto() {
      this.form.fotos = []
    },


  },
  created() {
    this.obtenerGaleria()
  },

}
</script>
