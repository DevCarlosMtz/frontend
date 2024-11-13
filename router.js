import Vue from 'vue'
import Router from 'vue-router'
import { scrollBehavior } from '~/utils'

Vue.use(Router)

/**
 * Este metodo sirve para importar las paginas
 *
 * @param {String} path
 * @returns
 */
const page = (path) => {
  return () => import(`~/pages/${path}`).then((m) => m.default || m)
}

/**
 * Este metodo sirve para crear grupos de rutas
 *
 * @param {String} prefixUrlAndName
 * @param {Array} routes
 * @returns {Array}
 */
const routesGroup = (prefixUrlAndName, routes) => {
  return routes.map((item) => {
    if (item.path.charAt(0) !== '/') {
      item.path = `/${item.path}`
    }

    item.path = `/${prefixUrlAndName}${item.path}`
    item.name = `${prefixUrlAndName}.${item.name}`
    return item
  })
}

/**
 * Declaracion de rutas
 *
 * @type {Array}
 */
const routes = [
  {
    name: 'index',
    path: '/',
    redirect: { name: 'dashboard.index' },
  },
  ...routesGroup('auth', [
    {
      name: 'index',
      path: '/',
      redirect: { name: 'auth.login' },
    },
    {
      name: 'login',
      path: '/login',
      component: page('auth/login.vue'),
    },
    {
      name: 'register',
      path: '/register',
      component: page('auth/register.vue'),
    },
    {
      name: 'verificar',
      path: '/verificar/:email',
      component: page('auth/verificar.vue'),
    },
    /**
     * Perfil
     */
    ...routesGroup('perfil', [
      {
        name: 'index',
        path: '/',
        redirect: { name: 'auth.perfil.inicio' },
      },
      {
        name: 'inicio',
        path: '/inicio',
        component: page('auth/perfil/inicio.vue'),
      },
    ]),
  ]),
  ...routesGroup('dashboard', [
    {
      name: 'index',
      path: '/',
      redirect: { name: 'dashboard.inicio' },
    },
    {
      name: 'inicio',
      path: '/inicio',
      component: page('dashboard/inicio.vue'),
    },

    /**
     * Catalogo de Usuarios
     */
    ...routesGroup('usuarios', [
      {
        path: '/',
        name: 'index',
        redirect: { name: 'dashboard.usuarios.inicio' },
      },
      {
        path: '/inicio',
        name: 'inicio',
        component: page('dashboard/usuarios/inicio.vue'),
      },
      {
        path: '/agregar',
        name: 'agregar',
        component: page('dashboard/usuarios/agregar.vue'),
      },
      {
        path: '/editar/:idUsuario',
        name: 'editar',
        component: page('dashboard/usuarios/editar.vue'),
      },
    ]),
    /**
     * Catalogo de Puestos
     */
    ...routesGroup('puestos', [
      {
        path: '/',
        name: 'index',
        redirect: { name: 'dashboard.puestos.inicio' },
      },
      {
        path: '/inicio',
        name: 'inicio',
        component: page('dashboard/puestos/inicio.vue'),
      },
      {
        path: '/agregar',
        name: 'agregar',
        component: page('dashboard/puestos/agregar.vue'),
      },
      {
        path: '/editar/:idPuesto',
        name: 'editar',
        component: page('dashboard/puestos/editar.vue'),
      },
    ]),

  ]),...routesGroup('moto', [
  ]),
]

export function createRouter() {
  return new Router({
    routes,
    /* scrollBehavior, */
    mode: 'history',
  })
}
