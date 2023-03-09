<template>
  <v-app>
    <v-app-bar v-if="$route.path !== '/'" color="#1f3863" height="130px" fixed app>
      <v-toolbar-title>
        <img src="@/assets/images/logo/ejp-rd-logo-450.png">
      </v-toolbar-title>
      <v-spacer />
      <v-btn x-large large tile color="#44a0fc">
        Resource Discovery
      </v-btn>
      <v-btn x-large text>
        Connected Sources
        <v-icon>
          mdi-chevron-down
        </v-icon>
      </v-btn>
      <v-btn class="mr-5" x-large text>
        <v-icon>
          mdi-account
        </v-icon>
        login
      </v-btn>
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

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
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
}
</script>
