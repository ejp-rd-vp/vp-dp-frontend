<template>
  <v-app>
    <v-app-bar dark color="#1f3863" height="130px" fixed app>
      <v-toolbar-title>
        <a href="https://www.ejprarediseases.org/" target="_blank">
          <img src="@/assets/images/logo/ejp-rd-logo-450.png">
        </a>
      </v-toolbar-title>
      <v-spacer />
      <v-btn-toggle
        v-model="discoverySubPages"
        class="mr-3"
        color="#44a0fc"
        group
        borderless
      >
        <v-btn x-large large tile value="discovery">
          Resource Discovery
        </v-btn>

        <v-btn x-large text value="sources">
          Connected Sources
        </v-btn>
      </v-btn-toggle>
      <v-btn v-if="!$auth.loggedIn" class="mr-5" @click="loginWithKeycloak" x-large text>
        <v-icon>
          mdi-account
        </v-icon>
        login
      </v-btn>
      <v-menu v-if="$auth.loggedIn" offset-y>
        <template #activator="{ on, attrs }">
          <v-btn
            color="white"
            x-large
            text
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-account</v-icon>
            {{ $auth.user.name }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            link
            @click="logout"
          >
            <v-icon>mdi-logout</v-icon>
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <Nuxt />
    </v-main>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<style>
html, body {
  font-family: Arial, Helvetica, sans-serif;
}
</style>

<script>
export default {
  data() {
    return {
      discoverySubPages: '',
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  watch: {
    '$route.path': {
      handler() {
        if(this.$route.path === '/discovery') {
          this.discoverySubPages = 'discovery'
        }
        if(this.$route.path === '/discovery/sources') {
          this.discoverySubPages = 'sources'
        }
      },
      immediate: true
    },
    discoverySubPages: {
      handler () {
        if (this.discoverySubPages === 'discovery') {
          this.$router.push({ path: '/discovery' })
        }
        if (this.discoverySubPages === 'sources') {
          this.$router.push({ path: '/discovery/sources' })
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    loginWithKeycloak () {
      try {
        this.$auth.loginWith('keycloak')
      } catch (err) {
        console.log(err)
      }
    },
    async logout () {
      try {
        await this.$auth.logout()
      } catch (err) {

      }
    }
  },
  created() {
    this.$cookies.nodeCookie
    if(this.$cookies.get('showDisclaimerNotification') === undefined) {
      this.$cookies.set('showDisclaimerNotification' , true, "1y")
    }
    if(this.$cookies.get('showCookiesNotification') === undefined) {
      this.$cookies.set('showCookiesNotification' , true, "1y")
    }
  }
}
</script>
