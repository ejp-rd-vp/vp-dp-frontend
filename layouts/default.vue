<template>
  <v-app>
    <AcceptFunctionalCookiesDialog v-if="!cookiesAccepted" />
    <v-app-bar  v-if="this.$vuetify.breakpoint.mdAndUp" dark color="#1f3863" height="130px" fixed app>
      <v-toolbar-title>
        <img src="@/assets/images/logo/VP-PORTAL.png">
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
          VP Network Resources
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
    <v-app-bar  v-else dark color="#1f3863" height="130px" fixed app>
      <v-toolbar-title>
        <img src="@/assets/images/logo/ejp-rd-logo-small.png">
      </v-toolbar-title>
      <v-spacer />
      <h1 style="color: #fffeff; font-family: Great Vibes cursive; font-size: 30px; line-height: 30px; font-weight: normal; margin-bottom: 0px; text-align: center; text-shadow: 0 1px 1px #fff;">
        VP-PORTAL
      </h1>
      <v-spacer />
      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-btn
            color="white"
            x-large
            text
            v-bind="attrs"
            v-on="on"
          >
            <v-icon x-large>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            link
            href="/discovery"
          >
            <v-list-item-title>
              Resource Discovery
            </v-list-item-title>
          </v-list-item>
          <v-list-item
            link
            href="/discovery/sources"
          >
            <v-list-item-title>
              VP Network Resources
            </v-list-item-title>
          </v-list-item>
          <v-divider />
          <v-list-item
            v-if="$auth.loggedIn"
            link
          >
            <v-icon>mdi-account</v-icon>
            {{ $auth.user.name }}
          </v-list-item>
          <v-list-item
            v-if="!$auth.loggedIn"
            link
            @click="loginWithKeycloak"
          >
            <v-icon>
              mdi-account
            </v-icon>
            <v-list-item-title>login</v-list-item-title>
          </v-list-item>
          <v-list-item
            v-if="$auth.loggedIn"
            link
            @click="loginWithKeycloak"
          >
            <v-icon>mdi-logout</v-icon>
            <v-list-item-title>logout</v-list-item-title>
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
import AcceptFunctionalCookiesDialog from "@/components/dialogs/AcceptFunctionalCookiesDialog.vue";

export default {
  components: { AcceptFunctionalCookiesDialog },
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
  computed: {
    cookiesAccepted() {
      return this.$store.getters["user_configs/areCookiesAccepted"]
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
}
</script>
