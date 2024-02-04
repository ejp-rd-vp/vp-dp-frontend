<script>
import DiscoverySearch from "@/components/search/DiscoverySearch.vue";
import SearchFilters from "@/components/search/SearchFilters.vue";

export default {
  components: { DiscoverySearch },
  props: {
    reloadNeeded: { required: true },
    hideFiltersButton: { required: false, default: false }
  },
  data () {
    return {
      searchParams: {
        resourceTypes: ['PatientRegistryDataset', 'BiobankDataset', 'Dataset', 'Catalog', 'Guideline'],
        countries: ['DE', 'NL'],
        sexes: ['MALE', 'FEMALE', 'UNDETERMINED', 'UNKNOWN'],
        ageThisYear: [20,39],
        symptomOnset: [20,39],
        ageAtDiagnoses: [20,39],
        hierarchy: ['UP']
      },
      showSearchFilters: false,
      searchQuery: '',
      selectedCodesObjects: [],
      showSearchAutoComplete: false,
    }
  },
  methods: {
    updateSearchParams(searchParams) {
      this.searchParams = searchParams
      this.$emit('updateSearchParams', searchParams)
    },
    executeSearch() {
      this.$emit('executeSearch')
    },
    handleNewSearchQuery(newSearchQuery) {
      this.searchQuery = newSearchQuery
    },
    hideSearchAutoComplete () {
      this.showSearchAutoComplete = false
    },
    addSelectedCodesObjects(codesObjects) {
      this.$emit('codeObjectIsSelected', codesObjects)
      this.selectedCodesObjects.push(...codesObjects)
    }
  },
  watch: {
    searchQuery() {
      this.showSearchAutoComplete = true
    }
  }
}
</script>

<template>
  <div>
    <DiscoverySearch
      :key="selectedCodesObjects.length"
      :reload-needed="reloadNeeded"
      :hide-filters="hideFiltersButton"
      @executeSearch="executeSearch"
      @hideShowSearchFilters="showSearchFilters = !showSearchFilters"
      @updateSearchQuery="handleNewSearchQuery($event)"
    />
    <SearchAutoComplete
      v-if="showSearchAutoComplete"
      style="position: absolute; z-index: 4 !important; margin-top: -54px; left: 50%; transform: translate(-50.05%, 0);"
      v-custom-click-outside="hideSearchAutoComplete"
      :key="searchQuery"
      :query="searchQuery"
      @addSelectedCodesObjects="addSelectedCodesObjects($event); hideSearchAutoComplete()"
    />
    <SearchFilters
      v-show="showSearchFilters"
      style="margin-top: -42px;"
      class="search-filters"
      @updateSearchParams="updateSearchParams($event)"
    />
  </div>
</template>

<style scoped lang="scss">

#no-background-hover::before {
  background-color: transparent !important;
}

@media (max-width: 1300px) {
  .search-filters {
    margin-bottom: 40px;
  }
}

</style>
