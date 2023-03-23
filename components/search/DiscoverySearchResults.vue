<script>
import Common from '~/assets/js/common'
export default {
  props: {
    currentOrphaCodes: { required: true, type: Array },
    searchParams: { required: true, type: Object },
    resources: { required: true, type: Array }
  },
  data () {
    return {
      searchResults: [],
      loading: false
    }
  },
  mounted() {
    this.fetchResults(this.currentOrphaCodes)
  },
  methods: {
    async fetchResults (orphaCodes) {
      if(!orphaCodes || orphaCodes.length < 1) {
        return
      }
      this.loading = true
      this.searchResults.orphaCodes = orphaCodes
      for (let resource of this.resources) {
        this.searchParams.diseases = this.currentOrphaCodes
        this.searchParams.source = resource
        this.$axios.$get(process.env.backendUrl + '/search',
          { params: this.searchParams, paramsSerializer (params) { return Common.paramsSerializer(params) } })
          .then(function (res) {
            if (res) {
              this.searchResults = this.searchResults.concat(res)
            }
          }.bind(this))
          .catch(function (err) {
            console.log('Unable to fetch search results: ' + err)
          }.bind(this))
      }
      this.loading = false
    }
  }
}
</script>
<template>
  <v-container class="pa-0">
    <v-row no-gutters justify="center">
      <v-col cols="12">
        <v-expansion-panels v-if="searchResults.length > 0 && !loading">
          <v-expansion-panel
            v-for="(result,i) in searchResults"
            :key="i"
          >
            <v-expansion-panel-header :disabled="!result.content.resourceResponses" :hide-actions="!result.content.resourceResponses" class="expansion-header" tile color="rgb(68, 160, 252)">
              <div class="eph-title">
                {{ result.name }}
              </div>
              <div class="eph-results">
                {{ result.numTotalResults }} result(s)
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content v-if="result.content.resourceResponses" style="min-width: 100%">
              <SearchResultContent
                :resultContent="result.content.resourceResponses"
              />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-progress-circular
          v-if="loading"
          class="progress-circular"
          :size="150"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
.progress-circular {
  top: 60%;
  left: 50%;
  margin: -70px 0 0 -70px;
}
.eph-term {
  color: white;
  background-color: #1f3863;
  padding: 10px;
}
.eph-results {
  color: black;
  max-width: 120px;
  margin-inline: 10px;
}
.eph-title {
  color: black;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 350px;
  height: 1.2em;
  white-space: nowrap;
  margin-right: 20px;
}

.expansion-header {
  height: 40px;
  border-radius: 0;
}
</style>
