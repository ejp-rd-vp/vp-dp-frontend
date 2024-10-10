<script>
export default {
  data () {
    return {
      dialog: true,
      usedCookies: [
        'auth.strategy: Authentication method',
        'auth._refresh_token.LSAAI: LSAAI refresh token for session refresh',
        'auth._refresh_token_expiration.LSAAI: Expiration time of the LSAAI refresh token',
        'auth.LSAAI.pkce_state:PKCE state for LSAAI authentication',
        'auth._token.LSAAI:LSAAI access token (for access to protected areas)',
        'auth._token_expiration.LSAAI: Expiration time of the LSAAI access token',
        'cookiesAccepted: Registers that cookies have been accepted'
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

        <v-list-item v-for="(cookie, index) in usedCookies" :key="index">
          <v-list-item-content>
            <v-list-item-title>{{ cookie.split(':')[0] }}</v-list-item-title>
            <v-list-item-subtitle>{{ cookie.split(':')[1].trim() }}</v-list-item-subtitle>
          </v-list-item-content>
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
