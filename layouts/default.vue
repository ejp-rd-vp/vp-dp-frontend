<template>
  <v-app>
    <AcceptFunctionalCookiesDialog v-if="!cookiesAccepted" />
    <v-app-bar  v-if="this.$vuetify.breakpoint.mdAndUp" dark color="#1f3863" height="130px" fixed app>
      <v-toolbar-title style="margin-top: 15px">
        <a href="/">
        <img src="../assets/images/logo/Rare_diseases_research_VP-Portal__3.png">
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
          VP Network Resources
        </v-btn>
        <v-btn x-large text href="/releasenote">
          Whats New!
        </v-btn>
      </v-btn-toggle>
      <v-btn v-if="!$auth.loggedIn" class="mr-5" @click="handleLogin" x-large text>
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
      <v-btn href="/about" icon>
        <v-icon>
          mdi-information-slab-circle-outline
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-app-bar  v-else dark color="#1f3863" height="130px" fixed app>
      <v-toolbar-title style="margin-top: -30px">
        <a href="/">
          <img src="../assets/images/logo/VP-Portal-new-Logo_short.png">
        </a>
      </v-toolbar-title>
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
            href="https://www.ejprarediseases.org/" target="_blank"
          >
            <v-list-item-title>
              EJP RD
            </v-list-item-title>
          </v-list-item>
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
          <v-list-item
            link
            href="/releasenote"
          >
            <v-list-item-title>
              Whats New!
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
            @click="handleLogin"
          >
            <v-icon>
              mdi-account
            </v-icon>
            <v-list-item-title>login</v-list-item-title>
          </v-list-item>
          <v-list-item
            v-if="$auth.loggedIn"
            link
            @click="handleLogin"
          >
            <v-icon>mdi-logout</v-icon>
            <v-list-item-title>logout</v-list-item-title>
          </v-list-item>
          <v-list-item
            link
            href="/about"
          >
            <v-icon>
              mdi-information-slab-circle-outline
            </v-icon>
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
    <v-footer v-if="$route.name !== 'discovery'" absolute class="d-flex justify-space-around mt-4 pt-4">
      <p>
        <b>2019-2024 European Joint Programme on Rare Diseases</b>
      </p>
      <div class="d-flex justify-center">
        <a href="https://www.ejprarediseases.org/" target="_blank">
          <img class="mr-2" height="55px" src="@/assets/images/logo/ejp-rd-logo-450.png">
        </a>
        <img class="mr-2" src="@/assets/images/others/eu-emblem.jpg" height="55px" />
        <p style="font-size: 12px; line-height: 14px">
          This work is supported by the funding from <br>
          the European Union's Horizon 2020 research <br>
          and innovation programme under the EJP RD <br>
          COFUND-EJP N° 825575
        </p>
      </div>
      <p class="float-right">
        <a href="/legal-notice">
          <b>Legal Notice</b>
        </a>
      </p>
    </v-footer>
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
    handleLogin () {
      try {
        this.$router.push({ path: '/login' })
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
