export default {
  telemetry: false,

  srcDir: __dirname,
  rootDir: __dirname,

  env: {
    appName: process.env.APP_NAME,
    apiUrl: process.env.API_URL,
    storageUrl: process.env.STORAGE_URL,
    webSocketHost: process.env.WEBSOCKETS_HOST,
    webSocketPort: process.env.WEBSOCKETS_PORT,
    webSocketKey: process.env.WEBSOCKETS_KEY,
    webSocketCluster: process.env.WEBSOCKETS_CLUSTER,
  },

  loading: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s | ' + process.env.APP_NAME,
    title: 'App',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    {
      src: '~/assets/scss/theme.scss',
      lang: 'scss',
    },
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/components/global',
    '~/plugins/axios.js',
    '~/plugins/services.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxtjs/router',
    // https://go.nuxtjs.dev/vuetify
    [
      '@nuxtjs/vuetify',
      {
        theme: {
          themes: {
            light: {
              primary: '#2980B9',
              accent: '#8C9EFF',
              secondary: '#607D8B',
              error: '#B71C1C',
              info: '#009688',
              success: '#4CAF50',
              warning: '#FFC107',
            },
          },
        },
      },
    ],
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://auth.nuxtjs.org
    '@nuxtjs/auth-next',
    //https://www.npmjs.com/package/@nuxtjs/laravel-echo
    '@nuxtjs/laravel-echo',
  ],


  echo: {
    broadcaster: 'pusher',
    key: process.env.WEBSOCKETS_KEY,
    wsHost: process.env.WEBSOCKETS_HOST,
    wsPort: process.env.WEBSOCKETS_PORT,
    cluster: process.env.WEBSOCKETS_CLUSTER,
    forceTLS: false,
    disableStats: true,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL,
  },

  auth: {
    strategies: {
      laravelJWT: {
        provider: 'laravel/jwt',
        url: process.env.API_URL + '/auth',
        endpoints: {
          login: { url: '/login', method: 'post' },
          logout: { url: '/logout', method: 'post' },
          refresh: { url: '/refresh', method: 'post' },
          user: { url: '/me', method: 'get' },
        },
      },
    },
    redirect: {
      login: '/auth/login',
      logout: '/auth/login',
      callback: '/auth/login',
      home: '/dashboard',
    },
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    meta: {
      title: process.env.APP_NAME,
      author: process.env.APP_AUTHOR,
      theme_color: '#F44336',
    },
    manifest: {
      name: process.env.APP_NAME,
      short_name: process.env.APP_NAME,
      description: process.env.APP_DESCRIPTION,
      start_url: '/',
      lang: 'es-MX',
    },
  },

  server: {
    port: 3000,
    host: '0.0.0.0',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extractCSS: true,
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
}
