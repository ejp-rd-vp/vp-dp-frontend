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
      <v-col align="right">
        <img class="mr-8 mt-6" src="@/assets/images/others/api-icon.png" width="60px">
      </v-col>
    </v-row>
    <DisclaimerNotice
      v-if="showDisclaimerNotice"
      @closeDisclaimerNotice="showDisclaimerNotice = false"
    />
    <DiscoverySearch
      @changeCurrentOrphaCode="currentOrphaCode = $event"
      @updateSearchParams="searchParams = $event"
    />
    <DiscoverySearchResults
      :key="currentOrphaCode"
      :currentOrphaCode="currentOrphaCode"
      :search-params="searchParams"
    />
    <FeedBackButton />
    <cookies-notification
      v-if="$store.getters.getCookiesNotificationStatus"
    />
  </div>
</template>

<style scoped lang="scss">

#no-background-hover::before {
  background-color: transparent !important;
}

.main-container {
  background: url("@/assets/images/others/dust_scratches.png");
  padding: 0;
  margin: 0;
  width: 100%;
  min-height: 101%;
}
</style>

<script>
import DiscoverySearch from "@/components/search/DiscoverySearch.vue";
import DiscoverySearchResults from "@/components/search/DiscoverySearchResults.vue";
import FeedBackButton from "@/components/common/FeedBackButton.vue";
import CookiesNotification from "@/components/common/CookiesNotification.vue";

export default {
  components: {CookiesNotification, FeedBackButton, DiscoverySearchResults, DiscoverySearch},
  auth: false,
  data () {
    return {
      currentOrphaCode: '',
      showDisclaimerNotice: true,
      showCookiesNotification: true,
      searchParams: {
        types: ['KnowledgeDataset', 'PatientRegistryDataset', 'BiobankDataset'],
        countries: ['DE', 'NL'],
        genders: ['male', 'female', 'undetermined', 'unknown'],
        ageThisYear: [20,39],
        symptomOnset: [20,39],
        ageAtDiagnoses: [20,39],
        hierarchy: ['up']
      }
    }
  }
}
</script>
