<script>
export default {
  beforeCreate() {
    try {
      this.$auth.loginWith('LSAAI')
      console.log(token)
    } catch (err) {
      console.log(err)
    }
  },
  methods: {
    loginWithKeycloak () {
      try {
        this.$auth.loginWith('LSAAI')
      } catch (err) {
        console.log(err)
      }
    },
  }
}
</script>

<template>
  <v-container fluid fill-height>
    <v-row justify="center" align="center">
      <v-col>
        <p>logging in ...</p>
      </v-col>
    </v-row>
  </v-container>
</template>
