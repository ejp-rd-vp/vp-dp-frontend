<script>
import Common from '~/assets/js/common'
import ResourceInfoDialog from "@/components/dialogs/ResourceInfoDialog.vue";
export default {
  components: { ResourceInfoDialog },
  props: {
    currentOrphaCodes: { required: true, type: Array },
    searchParams: { required: true, type: Object },
    resources: { required: true, type: Array }
  },
  data () {
    return {
      searchResults: [],
      fetchedResources: 0,
      loading: false,
      resourceInfoDialog: {
        show: false,
        resourceInfo: null
      }
    }
  },
  mounted() {
    this.fetchResults(this.currentOrphaCodes)
  },
  computed: {
    loggedIn() {
      return this.$auth.loggedIn
    }
  },
  methods: {
    async fetchResults (orphaCodes) {
      if(!orphaCodes || orphaCodes.length < 1) {
        return
      }
      this.loading = true
      this.fetchedResources = 0
      for (let resource of this.resources) {
        if (!resource.queryable) {
          this.fetchedResources += 1
          continue
        }
        this.searchParams.diseases = this.currentOrphaCodes
        this.searchParams.resourceId = resource.id
        this.searchParams.source = resource
        if(!this.loggedIn) {
          this.searchParams = this.discardFiltersNeedingAuthorization(this.searchParams)
        }
        this.$axios.$get('/api/v1/search',
          { params: this.searchParams, paramsSerializer (params) { return Common.paramsSerializer(params) } })
          .then(function (res) {
            this.fetchedResources += 1
            if (res && typeof res.content === 'object') {
              res.resourceInfo = resource
              this.searchResults = this.searchResults.concat(res)
            }
          }.bind(this))
          .catch(function (err) {
            console.log('Unable to fetch search results: ' + err)
          }.bind(this))
      }
      this.loading = false
    },
    discardFiltersNeedingAuthorization (searchParams) {
      delete searchParams['sexes']
      delete searchParams['ageThisYear']
      delete searchParams['symptomOnset']
      delete searchParams['ageAtDiagnoses']
      delete searchParams['hierarchy']
      return searchParams;
    },
    handleResourceInfoDialogIconClicked (resourceInfo) {
      this.resourceInfoDialog.resourceInfo = resourceInfo
      this.resourceInfoDialog.show = !this.resourceInfoDialog.show
    },
    closeResourceInfoDialog () {
      this.resourceInfoDialog.show = false
    },
    isBeaconIndividualsResponse (resourceInfo) {
      if (resourceInfo) {
        return resourceInfo.queryType.includes('BEACON_INDIVIDUALS')
      }
      return false
    },
    isBeaconCatalogsResponse (resourceInfo) {
      if (resourceInfo) {
        return resourceInfo.queryType.includes('BEACON_CATALOG')
      }
      return false
    },
    resourceHasResponseToBeListed (result) {
      return !result || !result.content || !result.content.response || !result.content.response.resultSets[0].results;
    }
  }
}
</script>
<template>
  <v-container class="pa-0">
    <ResourceInfoDialog
      v-if="resourceInfoDialog.show"
      :resource-info="resourceInfoDialog.resourceInfo"
      @closeResourceInfoDialog="closeResourceInfoDialog"
    />
    <v-row no-gutters justify="center">
      <v-col cols="12">
        <div>
          <h4 v-if="!(searchResults.every(result => !result?.content.responseSummary.numTotalResults )) ">
            Resource Level Results
          </h4>
        </div>

        <v-expansion-panels v-if="searchResults.length > 0 && !loading" class="mb-14" style="border: none">
          <v-progress-linear
            v-if="fetchedResources !== 0 && fetchedResources !== resources.length"
            indeterminate
            color="blue"
          ></v-progress-linear>

          <v-expansion-panel
            v-for="(result,i) in searchResults"
            :key="i"
            v-if="!loggedIn && isBeaconCatalogsResponse(result.resourceInfo)"
          >
            <v-expansion-panel-header
              v-if="result && result.resourceName &&
              result.content && result.content.responseSummary &&
              result.content.responseSummary.numTotalResults"
              :disabled="resourceHasResponseToBeListed(result)"
              :hide-actions="resourceHasResponseToBeListed(result)"
              class="expansion-header" tile color="rgb(68, 160, 252)"
            >
              <div class="eph-title">
                <v-icon class="mr-1" @click.native.stop
                        @click="handleResourceInfoDialogIconClicked(result.resourceInfo)">
                  mdi-information-variant
                </v-icon>
                {{ result.resourceName }}
              </div>
              <div class="eph-results">
                {{ result.content.responseSummary.numTotalResults }} result(s)
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content
              v-if="result && result.content &&
              result.content.response"
              style="min-width: 100%;"
            >
              <SearchResultContent
                :resultContent="result.content.response.resultSets[0].results"
              />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <div>
          <h4 v-if="!(searchResults.every(result => !result?.content.responseSummary.numTotalResults ))">Record Level Results</h4>
        </div>

        <v-expansion-panels
          v-if="searchResults.length > 0 && !loading"
          class="mb-14"
          style="border: none"
        >
          <v-progress-linear
            v-if="fetchedResources !== 0 && fetchedResources !== resources.length"
            indeterminate
            color="blue"
          ></v-progress-linear>

          <v-expansion-panel
            v-for="(result,i) in searchResults"
            :key="i"
            v-if="isBeaconIndividualsResponse(result.resourceInfo)"

          >
            <v-expansion-panel-header
              v-if="result && result.resourceName &&
              result.content && result.content.responseSummary &&
              result.content.responseSummary.numTotalResults"
              :disabled="resourceHasResponseToBeListed(result)"
              :hide-actions="resourceHasResponseToBeListed(result)"
              class="expansion-header" tile color="rgb(68, 160, 252)"
            >
              <div class="eph-title">
                <v-icon class="mr-1" @click.native.stop
                        @click="handleResourceInfoDialogIconClicked(result.resourceInfo)">
                  mdi-information-variant
                </v-icon>

                {{ result.resourceName }}
              </div>
              <div class="eph-results">
                {{ result.content.responseSummary.numTotalResults }} result(s)
              </div>
              <v-tooltip
                v-if="!loggedIn"
                bottom
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-icon
                    v-bind="attrs"
                    v-on="on"
                    class="mr-1"
                  >
                    mdi-lock
                  </v-icon>
                </template>
                <span>
                    Contact the Resource to access more information
                  </span>
              </v-tooltip>
            </v-expansion-panel-header>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
      <div v-if="!(fetchedResources !== 0 && fetchedResources !== resources.length)" >
        <p v-if="searchResults.every(result => !result?.content.responseSummary.numTotalResults )">
          no results found for this search.
        </p>
      </div>
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
  height: 1.7em;
  white-space: nowrap;
  margin-right: 20px;
}

.expansion-header {
  height: 55px;
  border-radius: 0;
}
</style>
