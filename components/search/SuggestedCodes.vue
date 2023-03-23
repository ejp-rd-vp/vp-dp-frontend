<script>
import Common from "assets/js/common";

export default {
  props: {
    currentOrphaCodes: { required: true }
  },
  data () {
    return {
      relatedCodes: [],
      selectedCodes: [],
      loadingRelatedCodes: false,
      hierarchyParams: {
        diseases: this.currentOrphaCodes,
        ways: ['up', 'down'],
        levels: [1, 2]
      }
    }
  },
  beforeMount() {
    this.fetchRelatedCodes()
  },
  methods: {
    async fetchRelatedCodes () {
      this.loadingRelatedCodes = true
      this.$axios.$get(process.env.backendUrl + '/hierarchy',
        { params: this.hierarchyParams, paramsSerializer (params) { return Common.paramsSerializer(params) } })
        .then(function (res) {
          if (res) {
            this.relatedCodes = res
          }
          this.loadingRelatedCodes = false
        }.bind(this))
        .catch(function (err) {
          console.log('Unable to fetch related codes: ' + err)
        }.bind(this))
    }
  },
  watch: {
    selectedCodes () {
      this.$emit('updateCurrentOrphaCodes', this.selectedCodes)
    }
  }
}
</script>

<template>
  <v-card
    v-if="relatedCodes && relatedCodes.length > 0 && !loadingRelatedCodes"
    width="300px"
    class="mx-auto"
  >
    <v-subheader>
      Related Orphanet Codes:
    </v-subheader>
    <v-list
      style="max-height: 250px; overflow-y: scroll"
      subheader
      two-line
      flat
    >

      <v-list-item-group>
        <v-list-item v-for="relatedCode in relatedCodes" :key="relatedCode.code">
          <v-list-item-action>
            <v-checkbox
              v-model="selectedCodes"
              :value="relatedCode.code"
              color="primary"
            ></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-list-item-title>{{ relatedCode.label }}</v-list-item-title>
                  <v-list-item-subtitle>Orpha: {{ relatedCode.code }}</v-list-item-subtitle>
                </span>
              </template>
              <span>{{ relatedCode.label }}</span>
            </v-tooltip>
          </v-list-item-content>
          <v-list-item-action>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
        <span
          v-bind="attrs"
          v-on="on"
        >
          <v-avatar v-if="relatedCode.way === 'up'">
              <v-icon
                color="green"
              >
                mdi-arrow-up-thick
              </v-icon>
              ({{ relatedCode.level }})
            </v-avatar>
        </span>
              </template>
              <span>Parent node.</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-avatar v-if="relatedCode.way === 'down'">
                      <v-icon
                        color="red"
                      >
                        mdi-arrow-down-thick
                      </v-icon>
                      ({{ relatedCode.level }})
                    </v-avatar>
                </span>
              </template>
              <span>Child node.</span>
            </v-tooltip>
          </v-list-item-action>
        </v-list-item>
      </v-list-item-group>
    </v-list>
  </v-card>
  <v-card
    v-else-if="loadingRelatedCodes"
    width="300px"
    height="250px"
    class="mx-auto"
  >
    <v-card-text>
      <v-card-subtitle>
        Loading related codes..
      </v-card-subtitle>
      <v-progress-circular
        class="ml-16 mt-3 mb-12"
        :size="150"
        color="primary"
        indeterminate
      />
    </v-card-text>
  </v-card>
  <v-card
    v-else
    width="300px"
    height="250px"
    class="mx-auto"
  >
    <v-card-text>
      <v-card-subtitle>
        No related orphanet codes..
      </v-card-subtitle>
    </v-card-text>
  </v-card>
</template>
