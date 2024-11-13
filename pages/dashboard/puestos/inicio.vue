<template>
  <div>
    <v-card elevation="10" class="rounded-lg">
      <v-toolbar color="primary" height="30">
        <span class="white--text text-md-h4 mt-12">
          <v-icon left dark large>mdi-account-group</v-icon> Puestos
        </span>
        <template v-slot:extension>
          <v-btn color="deep-purple darken-1" elevation="10" dark absolute bottom right fab
            :to="{ name: 'dashboard.puestos.agregar' }">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
      </v-toolbar>

      <v-card-text class="mt-n2">
        <!-- Datatable de motores -->
        <Datatable :loading="table.loading" :headers="table.headers" :items="table.items">
          <!-- Slot de acciones -->
          <template v-slot:item.acciones="{ item }">
            <!-- Boton para editar usuario -->
            <v-btn class="mx-2" fab dark color="teal" x-small :to="{
              name: 'dashboard.puestos.editar',
              params: { idPuesto: item.id },
            }">
              <v-icon dark>mdi-pencil</v-icon>
            </v-btn>
            <!-- Boton para eliminar usuario -->
            <v-btn class="mx-2" fab dark color="red" x-small @click="eliminar(item.id)">
              <v-icon dark>mdi-delete</v-icon>
            </v-btn>
          </template>
        </Datatable>
      </v-card-text>
    </v-card>
    <DialogConfirm ref="dialogConfirm" />
  </div>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware: 'auth',

  head: () => ({
    title: 'Puestos',
  }),

  data: () => ({
    storageUrl: process.env.storageUrl,
    table: {
      loading: false,
      items: [],
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Nombre', value: 'puesto' },
        { text: '', value: 'acciones' },
      ],
    },
  }),

  methods: {
    async obtenerListaPuestos() {
      try {
        this.table.loading = true
        this.table.items = await this.$services.puestos.index()
        this.table.loading = false
      } catch (error) {
        console.error('obtenerListaPuestos()', error)
      }
    },

    async eliminar(idPuesto) {
      const CONFIRMACION = await this.$refs.dialogConfirm.open(
        `Estás a punto de eliminar el puesto ${idPuesto}`
      )
      if (CONFIRMACION) {
        this.$store.dispatch('ui/dialogLoader/open')

        try {
          await this.$services.puestos.destroy({
            id: idPuesto,
          })

          await this.obtenerListaPuestos()
        } catch (error) {
          console.error('eliminar()', error)
        }

        this.$store.dispatch('ui/dialogLoader/close')
      }
    },
  },

  /**
   * Lifecycle hooks
   */
  created() {
    this.obtenerListaPuestos()
  },
}
</script>
