import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: 'EJP-RD Resource Discovery Portal',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'shortcut icon', type: 'image/png', href: '/img.png' }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/directives.js', ssr: true },
    { src: '~/plugins/vuex-persist', ssr: false, mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  ssr: true,
  target: 'server',

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'cookie-universal-nuxt'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true
  },
  proxy: {
    '/api': {
      target: process.env.BACKEND_URL,
      pathRewrite: {"^/api/": ""}
    }
  },

  auth: {
    cookie: {
      options: {
        httpOnly: false,
        secure: true
      }
    },
    redirect: {
      login: '/',
      logout: '/',
      callback: '/',
      home: '/discovery'
    },
    strategies: {
      local: false,
      LSAAI: {
        scheme: 'oauth2',
        endpoints: {
          authorization: process.env.SSO_AUTH_URL,
          userInfo: process.env.SSO_USER_INFO_URL,
          token: process.env.SSO_TOKEN_URL
        },
        token: {
          property: 'access_token',
          type: 'Bearer',
          name: 'Authorization',
          maxAge: 1800
        },
        refreshToken: {
          property: 'refresh_token',
          maxAge: 60 * 3
        },
        responseType: 'code',
        grantType: 'authorization_code',
        clientId: process.env.SSO_CLIENT_ID,
        scope: ['openid', 'profile', 'email'],
        codeChallengeMethod: 'S256'
      }
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    standalone: true,
    babel: { compact: true },
    extend (config) {
      config.module.rules.push({
        test: /\.md$/,
        loader: 'raw-loader'
      })
    }
  }
}
