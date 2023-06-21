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
  methods: {
    async fetchResults (orphaCodes) {
      if(!orphaCodes || orphaCodes.length < 1) {
        return
      }
      this.loading = true
      this.fetchedResources = 0
      for (let resource of this.resources) {
        this.searchParams.diseases = this.currentOrphaCodes
        this.searchParams.source = resource
        this.$axios.$get('/queryApi/search',
          { params: this.searchParams, paramsSerializer (params) { return Common.paramsSerializer(params) } })
          .then(function (res) {
            this.fetchedResources += 1
            if (res && res.length > 0 && typeof res[0] === 'object') {
              res[0].resourceInfo = resource
              this.searchResults = this.searchResults.concat(res)
            }
          }.bind(this))
          .catch(function (err) {
            console.log('Unable to fetch search results: ' + err)
          }.bind(this))
      }
      this.loading = false
    },
    handleResourceInfoDialogIconClicked (resourceInfo) {
      this.resourceInfoDialog.resourceInfo = resourceInfo
      this.resourceInfoDialog.show = !this.resourceInfoDialog.show
    },
    closeResourceInfoDialog () {
      this.resourceInfoDialog.show = false
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
        <v-expansion-panels v-if="searchResults.length > 0 && !loading" class="mb-14">
          <v-progress-linear
            v-if="fetchedResources !== 0 && fetchedResources !== resources.length"
            indeterminate
            color="blue"
          ></v-progress-linear>
          <v-expansion-panel
            v-for="(result,i) in searchResults"
            :key="i"
          >
            <v-expansion-panel-header v-if="result && result.name && result.numTotalResults" :disabled="!result || !result.content || !result.content.resourceResponses" :hide-actions="!result || !result.content || !result.content.resourceResponses" class="expansion-header" tile color="rgb(68, 160, 252)">
              <div class="eph-title">
                <v-icon class="mr-1" @click.native.stop @click="handleResourceInfoDialogIconClicked(result.resourceInfo)">
                  mdi-information-variant
                </v-icon>
                {{ result.name }}
              </div>
              <div class="eph-results">
                {{ result.numTotalResults }} result(s)
              </div>
            </v-expansion-panel-header>
            <v-expansion-panel-content
              v-if="result && result.content &&
              result.content.resourceResponses"
              style="min-width: 100%;"
            >
              <SearchResultContent
                :resultContent="result.content.resourceResponses"
              />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
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
  height: 1.7em;
  white-space: nowrap;
  margin-right: 20px;
}

.expansion-header {
  height: 55px;
  border-radius: 0;
}
</style>
