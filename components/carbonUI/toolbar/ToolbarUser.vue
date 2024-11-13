<template>
  <div>
    <v-menu offset-y left transition="slide-y-transition">
      <template v-slot:activator="{ on }">
        <v-btn icon class="elevation-2" v-on="on" block>
          <v-badge color="success" dot bordered offset-x="10" offset-y="10">
            <v-avatar size="35">
              <v-img
                v-if="user?.foto"
                :src="`${storageUrl}/usuarios/${user.foto}`"
              ></v-img>
              <v-icon v-else dark> mdi-account-circle </v-icon>
            </v-avatar>
          </v-badge>
        </v-btn>
      </template>

      <!-- user menu list -->
      <v-list dense nav>
        <v-list-item
          v-for="(item, index) in menu"
          :key="index"
          :exact="item.exact"
          :disabled="item.disabled"
          :to="item?.ruta"
          link
        >
          <v-list-item-icon>
            <v-icon small :class="{ 'grey--text': item.disabled }">
              {{ item.icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider class="my-1"></v-divider>

        <v-list-item link @click="logout()">
          <v-list-item-icon>
            <v-icon small>mdi-logout-variant</v-icon>
          </v-list-item-icon>
          <v-list-item-title> Salir </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <DialogConfirm ref="dialogConfirmToolbarUser" />
  </div>
</template>

<script>
import { exit } from 'process'

/*
|---------------------------------------------------------------------
| Toolbar User Component
|---------------------------------------------------------------------
|
| Quickmenu for user menu shortcuts on the toolbar
|
*/
export default {
  data: ({ $auth }) => ({
    storageUrl: process.env.storageUrl,
    menu: [
      //TODO: Agregar pagina de perfil y realizar formulario de edicion de perfil
      {
        icon: 'mdi-account-box-outline',
        text: 'Perfil',
        ruta: { name: 'auth.perfil.inicio' },
      },
      { icon: 'mdi-cog-outline', text: 'Settings' },
      { icon: 'mdi-chat-outline', text: 'Chat' },
    ],
  }),

  methods: {
    async logout() {
      const CONFIRMACION = await this.$refs.dialogConfirmToolbarUser.open(
        `${this.$auth.user.nombre}, estás a punto de salir de ${process.env.appName}`
      )
      if (CONFIRMACION) {
        try {
          this.$store.dispatch('ui/dialogLoader/open')
          await this.$auth.logout()
          await this.$router.push({ name: 'auth.login' })
        } catch (error) {
          console.error('logout()', error)
        } finally {
          this.$store.dispatch('ui/dialogLoader/close')
        }
      }
    },
  },

  /**
   * Lifecycle hook: created
   */
  computed: {
    user() {
      return this.$store.state.auth.user
    },
  },
}
</script>
