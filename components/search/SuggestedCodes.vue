<script>
import Common from "assets/js/common";
import {ref} from 'vue';

export default {
  props: {
    currentOrphaCodes: {required: true}
  },
  data() {
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
    async fetchRelatedCodes() {
      this.loadingRelatedCodes = true
      this.relatedCodes = []
      this.finalOrganizedData = []
      for (let orphaCode of this.currentOrphaCodes) {
        this.hierarchyParams.orphaCode = orphaCode
        console.log('Query Parameters:', JSON.stringify(this.hierarchyParams.orphaCode, null, 2)); // Log the query parameters before the request
        this.$axios.$get('/api/v1/hierarchy',
          {
            params: this.hierarchyParams, paramsSerializer(params) {
              return Common.paramsSerializer(params)
            }
          })
          .then(function (res) {
            if (res) {
              res = res.map(result => {
                result.relatedOrphaCode = orphaCode
                return result
              })
              this.relatedCodes.push(...res)
              this.relatedCodes = this.removeDuplicates(this.relatedCodes);
              this.relatedCodes = this.relatedCodes.filter(item => !this.currentOrphaCodes.includes(item.code))
            }
            this.loadingRelatedCodes = false
          }.bind(this))
          .catch(function (err) {
            console.log('Unable to fetch related codes: ' + err)
          }.bind(this))
      }
    },
    removeDuplicates(items) {
      const seen = new Set();
      return items.filter(item => {
        const duplicate = seen.has(item.code);
        seen.add(item.code);
        return !duplicate;
      });
    },
    emitCodeStatusChanged(orphaCode) {
      if (this.selectedCodes.includes(orphaCode)) {
        this.$emit('selectOrphaCode', orphaCode)
      } else {
        this.$emit('unselectOrphaCode', orphaCode)
      }
    }

  }

}
</script>

<template>
  <v-card
    v-if="relatedCodes && relatedCodes.length > 0 && !loadingRelatedCodes"
    class="mx-auto"
  >
    <v-row align="center" no-gutters>
      <v-col class="flex-grow-0">
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
                <span v-bind="attrs" v-on="on">
                  <v-avatar>
                    <v-icon color="blue">mdi-information-variant</v-icon>
                  </v-avatar>
                </span>
          </template>
          <span>The searched and related diseases are organized in a hierarchical structure according to the Orphanet classification, <br>defining parent diseases(those above) and child diseases(those below). <br>Different levels indicate the degree of specify, e.g. "parent level 1" is one level higher, while "child level 2" is two levels lower and more specific.<br>
              click on a disease to view resources on that disease.</span>
        </v-tooltip>
      </v-col>
      <v-col cols="auto">
        <v-subheader>Related Orphanet Codes:</v-subheader>
      </v-col>
    </v-row>

    <v-expansion-panels>
      <!-- Level 2 Way UP  -->
      <v-expansion-panel v-if="relatedCodes.some(relatedCode => relatedCode.level === 2 && relatedCode.way === 'UP')">
        <v-expansion-panel-header>
          Parent Level 2
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list style="max-height: 250px; overflow-y: scroll">
            <v-list-item
              v-for="relatedCode in relatedCodes.filter(relatedCode => relatedCode.level === 2 && relatedCode.way === 'UP')"
              :key="relatedCode.code"
            >
              <v-list-item-action>
                <v-checkbox
                  v-model="selectedCodes"
                  :value="relatedCode.code"
                  color="primary"
                  @click="emitCodeStatusChanged(relatedCode.code)"
                ></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                     <span v-bind="attrs" v-on="on">
                         <v-list-item-title>{{ relatedCode.label }}</v-list-item-title>
                          <v-list-item-subtitle>Orpha: {{
                              relatedCode.code
                            }}</v-list-item-subtitle>
                     </span>
                  </template>
                  <span>{{ relatedCode.label }}</span>
                </v-tooltip>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <!-- Level 1 Way UP -->
      <v-expansion-panel v-if="relatedCodes.some(relatedCode => relatedCode.level === 1 && relatedCode.way === 'UP')">
        <v-expansion-panel-header>
          Parent Level 1
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list style="max-height: 250px; overflow-y: scroll">
            <v-list-item
              v-for="relatedCode in relatedCodes.filter(relatedCode => relatedCode.level === 1 && relatedCode.way === 'UP')"
              :key="relatedCode.code"
            >
              <v-list-item-action>
                <v-checkbox
                  v-model="selectedCodes"
                  :value="relatedCode.code"
                  color="primary"
                  @click="emitCodeStatusChanged(relatedCode.code)"
                ></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                     <span v-bind="attrs" v-on="on">
                         <v-list-item-title>{{ relatedCode.label }}</v-list-item-title>
                          <v-list-item-subtitle>Orpha: {{
                              relatedCode.code
                            }}</v-list-item-subtitle>
                     </span>
                  </template>
                  <span>{{ relatedCode.label }}</span>
                </v-tooltip>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- Level 1 Way Down -->
      <v-expansion-panel v-if="relatedCodes.some(relatedCode => relatedCode.level === 1 && relatedCode.way === 'DOWN')">
        <v-expansion-panel-header>
          Child Level 1
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list style="max-height: 250px; overflow-y: scroll">
            <v-list-item
              v-for="relatedCode in relatedCodes.filter(relatedCode => relatedCode.level === 1 && relatedCode.way === 'DOWN')"
              :key="relatedCode.code"
            >
              <v-list-item-action>
                <v-checkbox
                  v-model="selectedCodes"
                  :value="relatedCode.code"
                  color="primary"
                  @click="emitCodeStatusChanged(relatedCode.code)"
                ></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                     <span v-bind="attrs" v-on="on">
                         <v-list-item-title>{{ relatedCode.label }}</v-list-item-title>
                          <v-list-item-subtitle>Orpha: {{
                              relatedCode.code
                            }}</v-list-item-subtitle>
                     </span>
                  </template>
                  <span>{{ relatedCode.label }}</span>
                </v-tooltip>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- Level 2 Way Down -->
      <v-expansion-panel v-if="relatedCodes.some(relatedCode => relatedCode.level === 2 && relatedCode.way === 'DOWN')">
        <v-expansion-panel-header>
          Child Level 2
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list style="max-height: 250px; overflow-y: scroll">
            <v-list-item
              v-for="relatedCode in relatedCodes.filter(relatedCode => relatedCode.level === 1 && relatedCode.way === 'DOWN')"
              :key="relatedCode.code"
            >
              <v-list-item-action>
                <v-checkbox
                  v-model="selectedCodes"
                  :value="relatedCode.code"
                  color="primary"
                  @click="emitCodeStatusChanged(relatedCode.code)"
                ></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                     <span v-bind="attrs" v-on="on">
                         <v-list-item-title>{{ relatedCode.label }}</v-list-item-title>
                          <v-list-item-subtitle>Orpha: {{
                              relatedCode.code
                            }}</v-list-item-subtitle>
                     </span>
                  </template>
                  <span>{{ relatedCode.label }}</span>
                </v-tooltip>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
  <v-card
    v-else-if="loadingRelatedCodes"
    class="mx-auto"
    height="250px"
    width="300px"
  >
    <v-card-text>
      <v-card-subtitle>
        Loading related codes..
      </v-card-subtitle>
      <v-progress-circular
        :size="150"
        class="ml-16 mt-3 mb-12"
        color="primary"
        indeterminate
      />
    </v-card-text>
  </v-card>
  <v-card
    v-else
    class="mx-auto"
    height="250px"
    width="300px"
  >
    <v-card-text>
      <v-card-subtitle>
        No related orphanet codes..
      </v-card-subtitle>
    </v-card-text>
  </v-card>
</template>
