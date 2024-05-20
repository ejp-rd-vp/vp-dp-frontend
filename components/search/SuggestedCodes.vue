<script>
import Common from "assets/js/common";
import { ref } from 'vue';

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
      this.finalOrganizedData=[]
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
    },

  },
  setup() {
    const rawData = [];
    const transformData = (data) => {
      let index= 1
      const groupedData = data.reduce((acc, item) => {
        const levelKey = `level ${item.level}`;
        if (!acc[levelKey]) {
          acc[levelKey] = {
            id: index++,
            name: `parent ${item.level}`,
            children: [{name:`${item.label}`}]
          };
        }
        acc[levelKey].children.push(item);
        return acc;
      }, {});

      return Object.values(groupedData);
    };
    const groupedData = ref(transformData(rawData));
      console.log(groupedData)
    return {
      transformData
    };

  }

}
</script>

<template>
  <v-card
    v-if="relatedCodes && relatedCodes.length > 0 && !loadingRelatedCodes"
    class="mx-auto"
  >
    <v-subheader>Related Orphanet Codes:</v-subheader>
    <p>The searched and related diseases are organized in a hierarchical structure according to the Orphanet classification, defining parent diseases(those above) and child diseases(those below). Different levels indicate the degree of specify, e.g. "parent level 1" is one level higher, while "child level 2" is two levels lower and more specific.
      click on a disease to view resources on that disease.
    </p>
    <v-expansion-panels>
      <!-- Level 2 Way UP  -->
      <v-expansion-panel v-if="relatedCodes.some(code => code.level === 2 && code.way === 'UP')">
        <v-expansion-panel-header>
          Parent Level 2
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list>
            <v-list-item
              v-for="code in relatedCodes.filter(code => code.level === 2 && code.way === 'UP')"
              :key="code.code"
            >
              <v-list-item-action>
                <v-checkbox
                  v-model="selectedCodes"
                  :value="code.code"
                  @click="emitCodeStatusChanged(code.code)"
                  color="primary"
                ></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                                    <span v-bind="attrs" v-on="on">
                                        <v-list-item-title>{{ code.label }}</v-list-item-title>
                                        <v-list-item-subtitle>Orpha: {{ code.code }}</v-list-item-subtitle>
                                    </span>
                  </template>
                  <span>{{ code.label }}</span>
                </v-tooltip>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <!-- Level 1 Way UP -->
      <v-expansion-panel  v-if="relatedCodes.some(code => code.level === 1 && code.way === 'UP')">
        <v-expansion-panel-header>
          Parent Level 1
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list>
            <v-list-item
              v-for="code in relatedCodes.filter(code => code.level === 1 && code.way === 'UP')"
              :key="code.code"
            >
              <v-list-item-action>
                <v-checkbox
                  v-model="selectedCodes"
                  :value="code.code"
                  @click="emitCodeStatusChanged(code.code)"
                  color="primary"
                ></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                                    <span v-bind="attrs" v-on="on">
                                        <v-list-item-title>{{ code.label }}</v-list-item-title>
                                        <v-list-item-subtitle>Orpha: {{ code.code }}</v-list-item-subtitle>
                                    </span>
                  </template>
                  <span>{{ code.label }}</span>
                </v-tooltip>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>

     <!-- Level 1 Way Down -->
      <v-expansion-panel  v-if="relatedCodes.some(code => code.level === 1 && code.way === 'DOWN')">
        <v-expansion-panel-header>
          Child Level 1
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list>
            <v-list-item
              v-for="code in relatedCodes.filter(code => code.level === 1 && code.way === 'DOWN')"
              :key="code.code"
            >
              <v-list-item-action>
                <v-checkbox
                  v-model="selectedCodes"
                  :value="code.code"
                  @click="emitCodeStatusChanged(code.code)"
                  color="primary"
                ></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                                    <span v-bind="attrs" v-on="on">
                                        <v-list-item-title>{{ code.label }}</v-list-item-title>
                                        <v-list-item-subtitle>Orpha: {{ code.code }}</v-list-item-subtitle>
                                    </span>
                  </template>
                  <span>{{ code.label }}</span>
                </v-tooltip>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- Level 2 Way Down -->
      <v-expansion-panel v-if="relatedCodes.some(code => code.level === 2 && code.way === 'DOWN')">
        <v-expansion-panel-header>
          Child Level 2
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-list>
            <v-list-item
              v-for="code in relatedCodes.filter(code => code.level === 1 && code.way === 'DOWN')"
              :key="code.code"
            >
              <v-list-item-action>
                <v-checkbox
                  v-model="selectedCodes"
                  :value="code.code"
                  @click="emitCodeStatusChanged(code.code)"
                  color="primary"
                ></v-checkbox>
              </v-list-item-action>
              <v-list-item-content>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                                    <span v-bind="attrs" v-on="on">
                                        <v-list-item-title>{{ code.label }}</v-list-item-title>
                                        <v-list-item-subtitle>Orpha: {{ code.code }}</v-list-item-subtitle>
                                    </span>
                  </template>
                  <span>{{ code.label }}</span>
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
