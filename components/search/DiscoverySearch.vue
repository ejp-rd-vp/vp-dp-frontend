<script>
import Codes from '~/assets/js/orphacode_complete'
import Countries from '~/assets/js/countries'
import SelectedObjectsList from "@/components/search/SelectedObjectsList.vue";
import searchFilters from "@/components/search/SearchFilters.vue";
export default {
  computed: {
    searchFilters() {
      return searchFilters
    }
  },
  components: { SelectedObjectsList },
  props: {
    reloadNeeded: { required: true },
    hideFilters: { required: false, default: false }
  },
  data () {
    return {
      selectedCodeObjects: [],
      selectedOrphaCodes: [],
      searchQuery: '',
      showAutoComplete: false,
      orphaCodes: [],
      selectedCode: null,
      selectedCodeObject: [],
      availableSearchItems: ['Names of diseases', 'Orpha Codes', 'Omim Codes', 'ICD-10 Codes', 'HGNC IDs', 'Symbols of genes', 'Names of genes']
    }
  },
  mounted() {
    this.orphaCodes = [...Codes.orphaCodes()]
  },
  methods: {
    executeSearch () {
      if (this.selectedCodeObjects) {
        this.$emit('executeSearch')
        this.$emit('changeCurrentOrphaCodes', this.selectedOrphaCodes)
      }
    },
    getCodeList (codes) {
      return codes && codes.length > 0 ? codes.split(',') : null
    },
    autoCompleteText (item) {
      let finalTitle = item.name
      if (this.selectedCode) {
        const filteredSynonymList =
          item.synonymList.filter(synonym => synonym.toLowerCase().includes(this.selectedCode.toLowerCase()))
        if (filteredSynonymList.length > 0) {
          finalTitle = '[' + filteredSynonymList + '] ' + finalTitle
        }
      }
      return this.highlightMatchingSubString(finalTitle, this.selectedCode)
    },
    highlightMatchingSubString(str, subStr) {
      let reg = new RegExp('(' +subStr+ ')', 'gi');
      return  str.replace(reg, '<mark>$1</mark>');
    }
  },
  watch: {
    searchQuery() {
      this.$emit('updateSearchQuery', this.searchQuery)
    }
  }
}
</script>

<template>
  <v-container>
    <v-row no-gutters justify="center" align="center">
      <v-col class="flex-grow-0">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              color="primary"
              dark
              v-bind="attrs"
              v-on="on"
              x-large
            >
              mdi-information-variant
            </v-icon>
          </template>
          <span>
            With this search bar, you have the ability to search for the following:
            <ul>
              <li v-for="searchItem in availableSearchItems" :key="searchItem">
                {{ searchItem }}
              </li>
            </ul>
          </span>
        </v-tooltip>
      </v-col>
      <v-col class="flex-grow-1">
        <v-text-field
          v-model="searchQuery"
          class="search-field mt-8"
          background-color="white"
          height="80px"
          label="Search for a disease name (e.g. ADPKD), gene (e.g. PKD1), or Orphacode (e.g. 730)"
          clearable
          outlined
          filled
        />
      </v-col>
      <v-col class="flex-grow-0">
        <v-btn class="ma-0" height="80px" @click="executeSearch" x-large tile color="rgb(68, 160, 252)">
          <v-icon v-if="!reloadNeeded" x-large>
            mdi-magnify
          </v-icon>
          <v-icon v-else x-large>
            mdi-reload
          </v-icon>
        </v-btn>
      </v-col>
      <v-col v-if="!hideFilters" class="flex-grow-0">
        <v-btn dark class="py-6" height="80px" x-large tile color="#1f3863" @click="$emit('hideShowSearchFilters')">
          Filter Search
          <v-icon>
            mdi-chevron-down
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
.short{
  width: 150px;
  span{
    width: 150px;
    text-align: center;
  }
}

.v-text-field ::v-deep label {
  font-size: 1.8em;
  min-height: 20px;
  font-style: italic;
}

.v-input {
  ::v-deep .v-label {
    height: 40px;
    line-height: 30px;
    letter-spacing: normal;
  }
}

@media (max-width: 900px) {
  .v-text-field ::v-deep label {
    font-size: 1em;
    min-height: 20px;
    font-style: italic;
  }

  .v-input {
    ::v-deep .v-label {
      height: 20px;
      line-height: 20px;
      letter-spacing: normal;
    }
  }
}

.search-field {
  border-radius: 0;
}

.filter-button {
  height: 100%;
}
</style>
