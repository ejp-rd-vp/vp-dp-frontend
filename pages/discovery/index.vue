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
    <v-row no-gutters>
      <v-col>
        <DisclaimerNotice
          v-if="$store.getters.getDisclaimerNotificationStatus"
        />
        <DiscoverySearch
          :reloadNeeded="selectedRelatedOrphaCodes.length > 0"
          :selectedRelatedOrphaCodes="selectedRelatedOrphaCodes"
          @executeSearch="executeSearch"
          @changeCurrentOrphaCodes="currentOrphaCodes = $event"
          @updateSearchParams="searchParams = $event"
        />
      </v-col>
    </v-row>
    <v-row v-if="currentOrphaCodes && currentOrphaCodes.length > 0" dense>
      <v-container>
        <v-row dense>
          <v-col>
            <DiscoverySearchResults
              :key="searchIndex"
              :resources="resources"
              :currentOrphaCodes="currentOrphaCodes"
              :search-params="searchParams"
            />
          </v-col>
          <v-col class="flex-grow-0">
            <SuggestedCodes
              :key="searchIndex"
              :currentOrphaCodes="currentOrphaCodes"
              @updateCurrentOrphaCodes="updateCurrentOrphaCodes($event)"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-row>
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
import SuggestedCodes from "@/components/search/SuggestedCodes.vue";

export default {
  components: {SuggestedCodes, CookiesNotification, FeedBackButton, DiscoverySearchResults, DiscoverySearch},
  auth: false,
  data () {
    return {
      searchIndex: 0,
      currentOrphaCodes: [],
      selectedRelatedOrphaCodes: [],
      initialSearchObjects: [],
      resources: [],
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
  },
  mounted() {
    this.fetchResources()
  },
  methods: {
    updateCurrentOrphaCodes(newCodes) {
      this.selectedRelatedOrphaCodes.length = 0
      this.selectedRelatedOrphaCodes.push(...newCodes)
    },
    executeSearch() {
      this.searchIndex += 1
      this.selectedRelatedOrphaCodes.length = 0
    },
    async fetchResources () {
      await this.$axios.$get(process.env.backendUrl + '/resources')
        .then(function (res) {
          if (res) {
            this.resources = res
          }
        }.bind(this))
        .catch(function (err) {
          console.log('Unable to fetch resources: ' + err)
        }.bind(this))
    }
  }
}
</script>
