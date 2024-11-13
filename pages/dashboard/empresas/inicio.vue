<template>
  <div>
    <v-card elevation="10" class="rounded-lg">
      <v-toolbar color="primary" height="30">
        <span class="white--text text-md-h4 mt-12">
          <v-icon left dark large>mdi-domain</v-icon>
          Empresas
        </span>
        <template v-slot:extension>
          <!-- <v-btn color="deep-purple darken-1" elevation="10" dark absolute bottom right fab
            :to="{ name: 'dashboard.empresas.agregar' }">
            <v-icon>mdi-plus</v-icon>
          </v-btn> -->
        </template>
      </v-toolbar>

      <v-card-text class="mt-n2">
        <!-- Datatable de empresas -->
        <Datatable :headers="table.headers" :items="table.items">
          <!-- Slot de foto -->
          <template v-slot:item.foto="{ item }">
            <v-avatar rounded size="32" v-if="item?.foto">
              <img :src="`${storageUrl}/empresas/${item.foto}`" />
            </v-avatar>
            <v-avatar rounded size="32" color="indigo" v-else>
              <v-icon dark> mdi-account-circle </v-icon>
            </v-avatar>
          </template>

          <!-- Slot de acciones -->
          <template v-slot:item.acciones="{ item }">
            <!-- Boton para editar motor -->
            <v-btn class="mx-2" fab dark color="teal" x-small :to="{
              name: 'dashboard.empresas.editar',
              params: { idEmpresa: item.id },
            }">
              <v-icon dark>mdi-pencil</v-icon>
            </v-btn>
            <!-- Boton para eliminar motor -->
            <v-btn class="mx-2" fab dark color="red" x-small @click="eliminar(item.id)">
              <v-icon dark>mdi-delete</v-icon>
            </v-btn>
          </template>
        </Datatable>
      </v-card-text>
    </v-card>
    <br />

    <DialogConfirm ref="dialogConfirm" />
  </div>
</template>

<style scoped>
.contenido {
  padding: 20px;
  background-color: azure;
}
</style>

<script>
export default {
  layout: 'dashboard',
  middleware: 'auth',

  head: () => ({
    title: 'Empresas',
  }),

  data: () => ({
    storageUrl: process.env.storageUrl,

    table: {
      items: [],
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Responsable', value: 'responsable' },
        { text: 'Domicilio Fiscal', value: 'domicilio_fiscal' },
        { text: 'Logo', value: 'foto' },
        { text: 'Dominio', value: 'dominio' },
        { text: 'Aviso de Privacidad', value: 'aviso_privacidad' },
        { text: 'Teléfono', value: 'telefono' },
        { text: '', value: 'acciones' },
      ],
    },
  }),

  methods: {
    async obtenerListaEmpresa() {
      try {
        this.table.items = await this.$services.empresas.index()
      } catch (error) {
        console.error('obtenerListaEmpresa()', error)
      }
    },

    async eliminar(idEmpresa) {
      const CONFIRMACION = await this.$refs.dialogConfirm.open(`Estás a punto de eliminar la empresa ${idEmpresa}`);
      if (CONFIRMACION) {
        this.$store.dispatch('ui/dialogLoader/open')

        try {
          await this.$services.empresas.destroy({
            id: idEmpresa,
          })

          await this.obtenerListaEmpresa()
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
    this.obtenerListaEmpresa()
  },
}
</script>
