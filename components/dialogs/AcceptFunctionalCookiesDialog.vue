<script>
export default {
  data () {
    return {
      dialog: true,
      usedCookies: [
        'auth.strategy',
        'auth._refresh_token.LSAAI',
        'auth._refresh_token_expiration.LSAAI',
        'auth.LSAAI.pkce_state',
        'auth._token.LSAAI',
        'auth._token_expiration.LSAAI',
        'cookiesAccepted'
      ]
    }
  },
}
</script>

<template>
  <v-dialog
    v-model="dialog"
    persistent
    width="380"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
      >
        Open Dialog
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="text-h5">
        Cookie Consent
      </v-card-title>
      <v-card-text>We use cookies to enable essential website operations and to ensure certain features work properly, like the option to log in. This tracking is always enabled, otherwise, you can't view the vp-portal.</v-card-text>


      <v-list-group
        :value="false"
      >
        <template v-slot:activator>
          <v-list-item-title>Display utilized cookies</v-list-item-title>
        </template>

        <v-list-item v-for="cookie in usedCookies" :key="cookie">
          <v-list-item-subtitle>
            {{ cookie }}
          </v-list-item-subtitle>
        </v-list-item>
      </v-list-group>


      <v-card-actions>
        <v-btn
          class="px-6 mx-8 mb-2"
          color="green"
          rounded
          @click="$store.commit('user_configs/setCookiesAccepted')"
        >
          Accept Functional Cookies
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
