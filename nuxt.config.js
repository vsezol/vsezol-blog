export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'vsezol:blog - a blog by Vsevolod Zolotov',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/styles/index.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome'
  ],

  fontawesome: {
    component: 'fa',
    icons: {
      regular: true,
      solid: true,
      brands: false
    }
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    icon: {},
    meta: {
      title: 'vsezol:blog',
      author: 'Vsevolod Zolotov'
    },
    manifest: {
      name: 'vsezol:blog about life',
      short_name: 'vsezol:blog',
      lang: 'en'
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, { isDev, isClient }) {
      config.node = {
        fs: 'empty'
      };
    }
  }

  // server: {
  //   port: 8000,
  //   host: '0.0.0.0'
  // }
};
