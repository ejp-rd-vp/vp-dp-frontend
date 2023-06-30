<template>
  <div class="main-container">
    <v-row>
      <v-col>
        <v-btn href="/" class="mt-8 ml-12 home-button" color="#44a0fc" icon id="no-background-hover">
          <v-icon size="40">
            mdi-arrow-left
          </v-icon>
          <v-icon class="ml-6" size="40">
            mdi-home-outline
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <DiscoverySourcesTable class="resources-table" />
  </div>
</template>

<style scoped lang="scss">

.resources-table {
  margin-bottom: 100px;
  @media screen and (max-width: 1200px) {
    margin-bottom: 200px;
  }
  @media screen and (max-width: 950px) {
    margin-bottom: 280px;
  }
}

#no-background-hover::before {
  background-color: transparent !important;
}

.main-container {
  background: url("@/assets/images/others/dust_scratches.png");
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 100%;
}
</style>

<script>
import DiscoverySourcesTable from "@/components/DiscoverySourcesTable.vue";
export default {
  name: 'IndexPage',
  data () {
    return {
    }
  }
}
</script>
