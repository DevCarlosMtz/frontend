<template>
  <div>
    <v-card elevation="10" class="rounded-lg">
      <v-toolbar color="primary" height="30">
        <span class="white--text text-md-h4 mt-12">
          <v-icon left dark large>mdi-account-group</v-icon> Usuarios
        </span>
        <template v-slot:extension>
          <v-btn color="deep-purple darken-1" elevation="10" dark absolute bottom right fab
            :to="{ name: 'dashboard.usuarios.agregar' }">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </template>
      </v-toolbar>

      <v-card-text class="mt-n2">
        <!-- Datatable de motores -->
        <Datatable :loading="table.loading" :headers="table.headers" :items="table.items">
          <!-- Slot de foto -->
          <template v-slot:item.foto="{ item }">
            <v-avatar rounded size="32" v-if="item?.foto">
              <img :src="`${storageUrl}/usuarios/${item.foto}`" />
            </v-avatar>
            <v-avatar rounded size="32" color="indigo" v-else>
              <v-icon dark> mdi-account-circle </v-icon>
            </v-avatar>
          </template>
          <!-- Slot de sueldo -->
          <template v-slot:item.sueldo="{ item }">
            <span>${{ item.sueldo }}</span>
          </template>
          <!-- Slot de acciones -->
          <template v-slot:item.acciones="{ item }">
            <!-- Boton para editar usuario -->
            <v-btn class="mx-2" fab dark color="teal" x-small :to="{
              name: 'dashboard.usuarios.editar',
              params: { idUsuario: item.id },
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
    title: 'Usuarios',
  }),

  data: () => ({
    storageUrl: process.env.storageUrl,
    table: {
      loading: false,
      items: [],
      headers: [
        { text: 'ID', value: 'id' },
        { text: 'Foto', value: 'foto' },
        { text: 'Nombre', value: 'nombre' },
        { text: 'Apellido paterno', value: 'ap_pat' },
        { text: 'Apellido materno', value: 'ap_mat' },
        { text: 'Correo electrónico', value: 'email' },
        { text: 'Sueldo', value: 'sueldo' },
        { text: 'Puesto', value: 'puesto.puesto' },
        { text: 'Perfil', value: 'perfil.nombre' },
        { text: 'Empresa', value: 'empresa.nombre' },
        { text: '', value: 'acciones' },
      ],
    },
  }),

  methods: {
    async obtenerListaUsuarios() {
      try {
        this.table.loading = true
        this.table.items = await this.$services.usuarios.index()
        this.table.loading = false
      } catch (error) {
        console.error('obtenerListaUsuarios()', error)
      }
    },

    async eliminar(idUsuario) {
      const CONFIRMACION = await this.$refs.dialogConfirm.open(
        `Estás a punto de eliminar el usuario ${idUsuario}`
      )
      if (CONFIRMACION) {
        this.$store.dispatch('ui/dialogLoader/open')

        try {
          await this.$services.usuarios.destroy({
            id: idUsuario,
          })

          await this.obtenerListaUsuarios()
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
    this.obtenerListaUsuarios()
  },
}
</script>
