<script>
export default {
  data () {
    return {
      alert: true,
    }
  },
}
</script>
<template>
    <v-alert
      v-model="alert"
      color="#44a0fc"
      border="left"
      elevation="2"
      colored-border
    >
      no results found for this search.
    </v-alert>
</template>

<style scoped lang="scss">

</style>
