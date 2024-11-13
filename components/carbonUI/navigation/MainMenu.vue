<template>
  <v-list nav dense>
    <div>{{ usuario.perfil.nombre }}</div>

    <div v-for="(item, index) in menu" :key="index">
      <div v-if="item.text" class="pa-1 mt-2 overline">{{ item.text }}</div>
      <nav-menu :menu="item.items" />
    </div>
  </v-list>
</template>

<script>
import NavMenu from './NavMenu'

export default {
  components: {
    NavMenu
  },
  data: () => ({
    items: [],
    menu: [],
    usuario: {},
  }),
  methods: {
    async obtenerMenu() {
      this.$store.dispatch("ui/dialogLoader/open");

      try {
        this.items = await this.$services.permisos.showHasUsuario({
          id_usuarios: this.usuario.id,
        });

        this.menu.push({
            items: [
              {
                text: 'Dashboard',
                icon: 'mdi-home',
                key:  'menu.dashboard',
                link: { name: 'dashboard.inicio' },
              },
            ],
          });


        this.items.forEach((item) => {
          this.menu.push({
            items: [
              {
                text: item.permisos.nombre_modulo,
                icon: item.permisos.icono,
                key: item.permisos.id_modulo,
                items: [
                  {
                    text: 'Reportes',
                    icon: 'mdi-table-multiple',
                    link: { name: item.permisos.url },
                  },
                ],
              },
            ],
          });
        });
      } catch (error) {
        console.error("obtenerMenu()", error);
      }

      this.$store.dispatch("ui/dialogLoader/close");
    }
  },
  created() {
    this.usuario = this.$auth.user;
    this.obtenerMenu();

  }
}
</script>
