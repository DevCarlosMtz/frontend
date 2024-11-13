<template>
  <v-layout class="fill-height">
    <!-- Navigation -->
    <v-navigation-drawer v-model="drawer" app floating class="elevation-1" :right="$vuetify.rtl" width="260">
      <!-- Navigation menu info -->
      <template v-slot:prepend>
        <div class="d-flex pa-2 align-center">
          <img src="/images/v-logo-small.png" height="48" alt="logo" class="mr-1" >
          <div>
            <div class="title font-weight-bold text-uppercase primary--text">{{ config.product.name }}</div>
            <div class="overline grey--text">{{ config.product.version }}</div>
          </div>

        </div>
        <v-divider class="mb-1"></v-divider>
      </template>

      <!-- Navigation menu -->
      <main-menu />


    </v-navigation-drawer>

    <!-- Toolbar -->
    <v-app-bar app flat color="surface">
      <v-card class="flex-grow-1 d-flex mt-3 mb-3" color="surface" flat>
        <div class="d-flex flex-grow-1 align-center">

          <!-- search input mobile -->


          <div class="d-flex flex-grow-1 align-center">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

            <v-spacer></v-spacer>

            <div class="align-center text-center">
              <h4>{{ user.nombre_completo }} - {{ user.perfil.nombre }}</h4>
            </div>

            <v-spacer class="d-block d-sm-none"></v-spacer>



            <div :class="[$vuetify.rtl ? 'ml-1' : 'mr-1']">
              <toolbar-notifications />
            </div>

            <toolbar-user />
          </div>
        </div>
      </v-card>
    </v-app-bar>

    <v-container :fluid="!isContentBoxed" class="pt-3">
      <router-view class="py-2 fill-height"></router-view>

      <!-- DEMO PURPOSES DEFAULT ROUTER VIEW -->
      <div v-if="isDemo" class="py-2 fill-height">
        <slot></slot>
      </div>
    </v-container>
  </v-layout>
</template>

<script>
import config from '~/configs'
import MainMenu from '~/components/carbonUI/navigation/MainMenu'
import ToolbarUser from '~/components/carbonUI/toolbar/ToolbarUser'
import ToolbarNotifications from '~/components/carbonUI/toolbar/ToolbarNotifications'
import menu from './menu'

export default {
  components: {
    MainMenu,
    ToolbarUser,
    ToolbarNotifications
  },
  props: {
    isDemo: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      menu,
      config,
      drawer: null,
      showSearch: false,
      isContentBoxed: false,
      user: {},
    }
  },
  created() {
    this.user = this.$auth.user;
  },
}
</script>

<style lang="scss">
.app-bar-full {

  .v-toolbar__content,
  .v-toolbar__extension {
    padding: 0;
  }
}
</style>
