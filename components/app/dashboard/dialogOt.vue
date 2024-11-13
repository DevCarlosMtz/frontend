<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">

        <v-card>

          <v-toolbar dark color="primary">
            <v-btn icon dark @click="dialog = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title>{{ title }}</v-toolbar-title>

          </v-toolbar>
          <v-card-text class="mt-n2">
            <!-- Datatable de ordenes -->
            <Datatable :loading="table.loading" :headers="table.headers" :items="table.items">

              <!-- Slot de acciones -->
              <template v-slot:item.acciones="{ item }">
                <!-- Boton para editar orden -->
                <v-btn class="mx-2" fab dark color="teal" x-small :to="{
                  name: 'dashboard.orden.editar',
                  params: { orden: item.ot },
                }">
                  <v-icon dark>mdi-pencil</v-icon>
                </v-btn>
                <!-- Boton para eliminar orden -->
                <v-btn class="mx-2" fab dark color="red" x-small @click="eliminar(item.id)">
                  <v-icon dark>mdi-delete</v-icon>
                </v-btn>
              </template>
            </Datatable>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
    <DialogConfirm ref="dialogConfirm" />

  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Ordenes de trabajo'
    },
    api: {
      type: String,
      default: ''
    },
    filtro: {
      type: Number,
      default: 0
    },
    fechaIni: {
      type: String,
      default: ''
    },
    fechaFin: {
      type: String,
      default: ''
    }


  },
  data() {
    return {
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      table: {
        items: [],
        headers: [
          { text: 'ID', value: 'id' },
          { text: 'Orden de Trabajo', value: 'ot' },
          { text: 'Tipo De Motor', value: 'motor.nombre' },
          { text: 'RU', value: 'registro_unico.ru' },
          { text: 'Estatus', value: 'estatus.nombre' },
          { text: 'Cotizado', value: 'cotizado' },
          { text: 'Autorizado', value: 'autorizado' },
          { text: 'Terminado', value: 'terminado' },
          { text: 'Entregado', value: 'entregado' },
          { text: '', value: 'acciones' },
        ],
      },

    }

  },
  watch: {
    filtro: function () {
      if (this.filtro != 4) {
        this.obtenerListaOrdenesDeTrabajo()
      }
    }
  },
  methods: {
    open() {
      this.obtenerListaOrdenesDeTrabajo()
      this.dialog = true
    },
    async obtenerListaOrdenesDeTrabajo() {
      try {
        console.log(this.api, this.filtro, this.fechaIni, this.fechaFin)
        if (this.api == 'showDetalleOtProceso') {
          this.table.items = await this.$services.dashboardAdmin.showDetalleOtProceso({
            filtro: this.filtro,
            fechaIni: this.fechaIni,
            fechaFin: this.fechaFin
          })
        }
        if (this.api == "showDetalleOtRevision") {
          this.table.items = await this.$services.dashboardAdmin.showDetalleOtRevision({
            filtro: this.filtro,
            fechaIni: this.fechaIni,
            fechaFin: this.fechaFin
          })
        }
        if (this.api == "showOtDetalleFinalizadas") {
          this.table.items = await this.$services.dashboardAdmin.showOtDetalleFinalizadas({
            filtro: this.filtro,
            fechaIni: this.fechaIni,
            fechaFin: this.fechaFin
          })
        }
        if (this.api == "showDetalleOtPendientes") {
          this.table.items = await this.$services.dashboardAdmin.showDetalleOtPendientes({
            filtro: this.filtro,
            fechaIni: this.fechaIni,
            fechaFin: this.fechaFin
          })
        }
      } catch (error) {
        console.log('Error: obtenerListaOrdenesDeTrabajo()', error)
      }
    },

    async eliminar(idOrden) {
      const CONFIRMACION = await this.$refs.dialogConfirm.open(
        `Estás a punto de eliminar la orden de trabajo ${idOrden}`
      )
      if (CONFIRMACION) {
        this.$store.dispatch('ui/dialogLoader/open')

        try {
          await this.$services.ordenes.destroy({
            id: idOrden,
          })

          await this.obtenerListaOrdenesDeTrabajo()
        } catch (error) {
          console.log('Error: eliminar()', error)
        }

        this.$store.dispatch('ui/dialogLoader/close')
      }
    },
  },
  created() {
    this.obtenerListaOrdenesDeTrabajo()
  },
}
</script>
