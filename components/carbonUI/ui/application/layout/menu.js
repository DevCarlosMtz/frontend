export default [{
  text: '',
  items: [
    { icon: 'mdi-view-dashboard-outline', key: 'menu.dashboard', text: 'Dashboard', link: { name: 'dashboard.inicio' } },
    {
      icon: 'mdi-text-box', key: 'menu.cotizacion', text: 'Cotizaciones',
      items: [
        { icon: 'mdi-table-multiple', text: 'Reporte', link: { name: 'dashboard.cotizacion.inicio' } },
        { icon: 'mdi-plus-box', text: 'Agregar', link: { name: 'dashboard.cotizacion.agregar' } },
      ]
    },
    {
      icon: 'mdi-account-group', key: 'menu.clientes', text: 'Clientes',
      items: [
        { icon: 'mdi-table-multiple', text: 'Reporte', link: '/dashboard/clientes/inicio' },
        { icon: 'mdi-account-plus', text: 'Agregar', link: '/dashboard/clientes/agregar' },
      ]
    },
    {
      icon: 'mdi-engine', key: 'menu.motores', text: 'Motores',
      items: [
        { icon: 'mdi-table-multiple', text: 'Reporte', link: { name: 'dashboard.motores.inicio' } },
        { icon: 'mdi-plus-box', text: 'Agregar', link: { name: 'dashboard.motores.agregar' } },
      ]
    },
    {
      icon: 'mdi-domain', key: 'menu.empresas', text: 'Empresas',
      items: [
        { icon: 'mdi-table-multiple', text: 'Reporte', link: '/dashboard/empresas/inicio' },
        { icon: 'mdi-domain-plus', text: 'Agregar', link: '/dashboard/empresas/agregar' },
      ]
    },
    {
      icon: 'mdi-account-group', key: 'menu.usuarios', text: 'Usuarios',
      items: [
        { icon: 'mdi-table-multiple', text: 'Reporte', link: '/dashboard/usuarios/inicio' },
        { icon: 'mdi-account-plus', text: 'Agregar', link: '/dashboard/usuarios/agregar' },
      ]
    },
    {
      icon: 'mdi-account-cog', key: 'menu.puestos', text: 'Puestos',
      items: [
        { icon: 'mdi-table-multiple', text: 'Reporte', link: '/dashboard/puestos/inicio' },
        { icon: 'mdi-account-plus', text: 'Agregar', link: '/dashboard/puestos/agregar' },
      ]
    },
    // { icon: 'mdi-file-document',  key: 'menu.ordenes', text: 'Ordenes',
    //   items: [
    //       { icon: 'mdi-table-multiple', text: 'Reporte', link: '/dashboard/ordenes/inicio' },
    //       { icon: 'mdi-file-document-plus', text: 'Agregar', link: '/dashboard/ordenes/agregar' },

    //   ]
    // },
    {
      icon: 'mdi-text-box', key: 'menu.placa', text: 'Placa',
      items: [
        { icon: 'mdi-table-multiple', text: 'Reporte', link: '/dashboard/placa/inicio' },
        { icon: 'mdi-text-box-plus', text: 'Agregar', link: '/dashboard/placa/agregar' },
      ]
    },
    {
      icon: 'mdi-text-box-multiple-outline', key: 'menu.orden', text: 'Orden de Trabajo',
      items: [
        { icon: 'mdi-table-multiple', text: 'Reporte', link: '/dashboard/orden/inicio' },
        { icon: 'mdi-file-document-plus', text: 'Agregar', link: '/dashboard/orden/agregar' },
        // { icon: 'mdi-camera', text: 'Conexion Externa', link: '/dashboard/orden/conexionesExternas' },

      ]
    },
    {
      icon: 'mdi-text-box-multiple-outline', key: 'menu.orden', text: 'Reportes',
      items: [
        //{ icon: 'mdi-table-multiple', text: 'Reporte', link: '/dashboard/orden/inicio' },
        { icon: 'mdi-file-document-plus', text: 'Reporte Final', link: '/dashboard/reporte/final' },
        // { icon: 'mdi-camera', text: 'Conexion Externa', link: '/dashboard/orden/conexionesExternas' },

      ]
    },
  ]
}, {
  text: 'Other',
  key: 'menu.others',
  items: [
    { icon: 'mdi-file-outline', key: 'menu.blank', text: 'Blank Page', link: '' },
    {
      key: 'menu.levels', text: 'Menu Levels',
      items: [
        { text: 'Menu Levels 2.1' },
        {
          text: 'Menu Levels 2.2',
          items: [
            { text: 'Menu Levels 3.1' },
            { text: 'Menu Levels 3.2' }
          ]
        }
      ]
    },
    { key: 'menu.disabled', text: 'Menu Disabled', disabled: true }
  ]
}]
