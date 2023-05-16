<script>
import DiscoverySearch from "@/components/search/DiscoverySearch.vue";
import SearchFilters from "@/components/search/SearchFilters.vue";
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
      searchQuery: '',
      showDisclaimerNotification: false,
      showCookiesNotification: false,
      showSearchAutoComplete: false,
      showSearchFilters: false,
      currentOrphaCodes: [],
      selectedOrphaCodes: [],
      selectedCodesObjects: [],
      resources: [],
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
    this.showDisclaimerNotification = this.$cookies.get('showDisclaimerNotification')
    this.showCookiesNotification = this.$cookies.get('showCookiesNotification')
  },
  methods: {
    handleNewSearchQuery(newSearchQuery) {
      this.searchQuery = newSearchQuery
    },
    hideSearchAutoComplete () {
      this.showSearchAutoComplete = false
    },
    orphaCodeToCodeObject (orphaCode) {
      return {
        orphaCode: orphaCode
      }
    },
    addSelectedCodeObject(codeObject) {
      this.selectedCodesObjects.push(codeObject)
    },
    addSelectedCodesObjects(codesObjects) {
      this.selectedCodesObjects.push(...codesObjects)
    },
    removeSelectedCodeObject(codeObject) {
      this.selectedCodesObjects = this.selectedCodesObjects.filter(obj => obj.orphaCode !== codeObject.orphaCode)
    },
    executeSearch() {
      this.searchIndex += 1
      this.currentOrphaCodes = [...this.selectedOrphaCodes]
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
    },
    async getAssociatedOrphaForHgncId(hgncId) {
      let orphaCode = '0'
      await this.$axios.$get(process.env.genesAndRareDiseasesUrl + "/v1/genes/" + hgncId + "/mapping")
        .then(function(res) {
          orphaCode = res.orphaCode
        })
        .catch(function (err) {
          console.log('Unable to fetch mapping: ' + err)
        })
        return orphaCode
    },
    arraysAreEqual(a, b) {
      if (a === b) return true;
      if (a == null || b == null) return false;
      if (a.length !== b.length) return false;
      for (let i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
      }
      return true;
    }
  },
  computed: {
    searchReloadNeeded() {
      return !this.arraysAreEqual(this.selectedOrphaCodes, this.currentOrphaCodes)
        && this.selectedCodesObjects.length > 0
    }
  },
  watch: {
    searchQuery() {
      this.showSearchAutoComplete = true
    },
    selectedCodesObjects: {
      async handler() {
        let orphaCodes = []
        for (let i = 0; i < this.selectedCodesObjects.length; i++) {
          if (this.selectedCodesObjects[i].orphaCode !== '0') {
            orphaCodes.push(this.selectedCodesObjects[i].orphaCode)
          } else {
            const orphaCode = await this.getAssociatedOrphaForHgncId(this.selectedCodesObjects[i].hgncId)
            orphaCodes.push(orphaCode)
          }
        }
        this.selectedOrphaCodes = orphaCodes.filter(item => item !== '0')
      },
      immediate: true,
      deep: true
    }
  }
}
</script>


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
    <v-row>
      <v-col>
        <DisclaimerNotice
          v-if="showDisclaimerNotification"
        />
      </v-col>
    </v-row>
    <v-row no-gutters>
      <v-col cols="12">
        <SearchSelectedObjectsList
          v-if="selectedCodesObjects.length > 0"
          style="margin-bottom: -45px"
          :key="selectedCodesObjects.length"
          :selected-codes-objects="selectedCodesObjects"
          @updateSelectedCodesObjects="selectedCodesObjects = $event"
        />
      </v-col>
      <v-col cols="12">
        <DiscoverySearch
          :key="selectedCodesObjects.length"
          :reloadNeeded="searchReloadNeeded"
          @executeSearch="executeSearch"
          @hideShowSearchFilters="showSearchFilters = !showSearchFilters"
          @updateSearchQuery="handleNewSearchQuery($event)"
        />
        <SearchAutoComplete
        style="position: absolute; z-index: 4 !important; margin-top: -54px; left: 50%; transform: translate(-50.05%, 0);"
        v-if="showSearchAutoComplete"
        v-custom-click-outside="hideSearchAutoComplete"
        :key="searchQuery"
        :query="searchQuery"
        @addSelectedCodesObjects="addSelectedCodesObjects($event); hideSearchAutoComplete()"
      />
      </v-col>
      <v-col cols="12">
        <SearchFilters
          v-show="showSearchFilters"
          style="margin-top: -42px;"
          class="search-filters"
          @updateSearchParams="searchParams = $event"
        />
      </v-col>
    </v-row>
    <v-row
      v-if="currentOrphaCodes
      && currentOrphaCodes.length > 0
      && selectedOrphaCodes.length > 0
      && !searchReloadNeeded"
      dense
    >
      <v-container>
        <v-row :key="searchIndex" dense>
          <v-col>
            <DiscoverySearchResults
              :resources="resources"
              :currentOrphaCodes="currentOrphaCodes"
              :search-params="searchParams"
            />
          </v-col>
          <v-col class="flex-grow-0">
            <SuggestedCodes
              :currentOrphaCodes="currentOrphaCodes"
              @selectOrphaCode="addSelectedCodeObject(orphaCodeToCodeObject($event))"
              @unselectOrphaCode="removeSelectedCodeObject(orphaCodeToCodeObject($event))"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-row>
    <FeedBackButton />
    <cookies-notification
      v-if="showCookiesNotification"
    />
  </div>
</template>

<style scoped lang="scss">

#no-background-hover::before {
  background-color: transparent !important;
}

.main-container {
  background: url("@/assets/images/others/dust_scratches.png");
  padding: 0 !important;
  margin: 0 !important;
  width: 100%;
  min-height: 101%;
}

@media (max-width: 1300px) {
  .search-filters {
    margin-bottom: 40px;
  }
}

</style>
