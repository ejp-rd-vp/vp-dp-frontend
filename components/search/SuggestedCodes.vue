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
        orphaCode: this.currentOrphaCodes,
        ways: ['UP', 'DOWN'],
        numberOfLevels: 2
      }
    }
  },
  beforeMount() {
    this.fetchRelatedCodes()
  },
  methods: {
    async fetchRelatedCodes () {
      this.loadingRelatedCodes = true
      this.relatedCodes = []
      for (let orphaCode of this.currentOrphaCodes) {
        this.hierarchyParams.orphaCode = orphaCode
        this.$axios.$get('/api/v1/hierarchy',
          { params: this.hierarchyParams, paramsSerializer (params) { return Common.paramsSerializer(params) } })
          .then(function (res) {
            if (res) {
              res = res.map(result => {
                result.relatedOrphaCode = orphaCode
                return result
              })
              this.relatedCodes.push(...res)
              this.relatedCodes = this.relatedCodes.filter(item => !this.currentOrphaCodes.includes(item.code))
            }
            this.loadingRelatedCodes = false
          }.bind(this))
          .catch(function (err) {
            console.log('Unable to fetch related codes: ' + err)
          }.bind(this))
      }
    },
    emitCodeStatusChanged(orphaCode) {
      if(this.selectedCodes.includes(orphaCode)) {
        this.$emit('selectOrphaCode', orphaCode)
      } else {
        this.$emit('unselectOrphaCode', orphaCode)
      }
    }
  },
}
</script>

<template>
  <v-card
    v-if="relatedCodes && relatedCodes.length > 0 && !loadingRelatedCodes"
    class="mx-auto"
  >
    <v-subheader>
      Related Orphanet Codes:
    </v-subheader>
    <p> The searched and related diseases are organized in a hierarchical structure according to the <strong>Orphanet classification</strong>, defining <strong>parent diseases</strong>(those above) and <strong>child diseases</strong>(those below). Different levels indicate the degree of specify, e.g. "parent 1" is one level higher, while "child 2" is two levels lower and more specific.<br>
    click on a disease to view resources on that disease.
    </p>
    <v-list
      style=" overflow-y: scroll"
      subheader
      two-line
      flat
    >
{{relatedCodes}}
      <v-list-item-group>
        <v-list-item v-for="relatedCode in relatedCodes" :key="relatedCode.code">
          <v-list-item-action>
            <v-checkbox
              v-model="selectedCodes"
              :value="relatedCode.code"
              @click="emitCodeStatusChanged(relatedCode.code)"
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
          <v-avatar v-if="relatedCode.way === 'UP'">
              <v-icon
                color="green"
              >
                mdi-arrow-up-thick
              </v-icon>
              ({{ relatedCode.level }})
            </v-avatar>
        </span>
              </template>
              <span>Parent node of {{ relatedCode.relatedOrphaCode }}</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <span
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-avatar v-if="relatedCode.way === 'DOWN'">
                      <v-icon
                        color="red"
                      >
                        mdi-arrow-down-thick
                      </v-icon>
                      ({{ relatedCode.level }})
                    </v-avatar>
                </span>
              </template>
              <span>Child node of {{ relatedCode.relatedOrphaCode }}</span>
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
