<script>
import Codes from '~/assets/js/orphacode_complete'
export default {
  data () {
    return {
      hierarchy: {
        current: 'Up',
        variations: ['Up', 'Down', 'Undefined']
      },
      selectedCode: null,
      selectedCodeObject: null,
      showFilters: false,
      symptomOnset: {
        min: 0,
        max: 100,
        range: [10, 40]
      },
      ageThisYear: {
        min: 0,
        max: 100,
        range: [30, 40]
      },
      ageAtDiagnosis: {
        min: 0,
        max: 100,
        range: [35, 40]
      },
      sex: [
        {
          type: 'Female',
          checked: false
        },
        {
          type: 'Male',
          checked: false
        },
        {
          type: 'Undetermined',
          checked: false
        },
        {
          type: 'Unknown',
          checked: false
        }
      ],
      items1: ['Patient Registries', 'Biobanks', 'Knowledge Bases'],
      value1: ['Patient Registries', 'Biobanks', 'Knowledge Bases'],
      items2: ['Austria',
        'Belgium',
        'Bulgaria',
        'Cyprus',
        'Czech Republic',
        'Germany',
        'Denmark',
        'Estonia',
        'Spain',
        'Finland',
        'France',
        'United Kingdom',
        'Greece',
        'Hungary',
        'Croatia',
        'Ireland, Republic of (EIRE)',
        'Italy',
        'Lithuania',
        'Luxembourg',
        'Latvia',
        'Malta',
        'Netherlands',
        'Poland',
        'Portugal',
        'Romania',
        'Sweden',
        'Slovenia',
        'Slovakia',],
      value2: ['Austria',
        'Belgium',
        'Bulgaria',
        'Cyprus',
        'Czech Republic',
        'Germany',
        'Denmark',
        'Estonia',
        'Spain',
        'Finland',
        'France',
        'United Kingdom',
        'Greece',
        'Hungary',
        'Croatia',
        'Ireland, Republic of (EIRE)',
        'Italy',
        'Lithuania',
        'Luxembourg',
        'Latvia',
        'Malta',
        'Netherlands',
        'Poland',
        'Portugal',
        'Romania',
        'Sweden',
        'Slovenia',
        'Slovakia',],
    }
  },
  methods: {
    executeSearch () {
      if (this.selectedCodeObject) {
        this.$emit('changeCurrentOrphaCode', this.selectedCodeObject.orphaCode)
      }
    },
    customFilter (item, queryText, itemText) {
      const textOne = item.name + '__' + item.orphaCode + '__' + item.synonymList.join('__') + '__' + item.codeList
      const searchText = queryText.toLowerCase()
      return textOne.toLowerCase().indexOf(searchText) > -1
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
  computed: {
    orphaCodes () {
      return Codes.orphaCodes()
    }
  }
}
</script>

<template>
  <v-container>
    <v-row no-gutters justify="center" align="center">
      <v-col class="flex-grow-1">
        <v-autocomplete
          v-model="selectedCodeObject"
          class="search-field mt-8"
          :items="orphaCodes"
          height="80px"
          label="Search by rare disease name or orpha/icd10 code ..."
          outlined
          filled
          background-color="white"
          :filter="customFilter"
          item-text="name"
          return-object
          :search-input.sync="selectedCode"
        >
          <template v-slot:item="{ item }">
            <v-list-item-content>
              <v-list-item-title v-html="autoCompleteText(item)"></v-list-item-title>
              <v-list-item-subtitle>
                <v-chip
                  class="mx-1 short"
                  color="grey"
                  label
                  outlined
                  small
                >
                  <span v-html="'orpha:' + highlightMatchingSubString(item.orphaCode, selectedCode)"></span>
                </v-chip>
                <v-chip
                  v-for="code in getCodeList(item.codeList)"
                  :key="code"
                  v-if="selectedCode && code.toLowerCase().includes(selectedCode.toLowerCase())"
                  class="mx-1 short"
                  color="grey"
                  label
                  outlined
                  small
                >
                  <span v-html="highlightMatchingSubString(code, selectedCode)"></span>
                </v-chip>
              </v-list-item-subtitle>
            </v-list-item-content>
<!--            <v-list-item-action>-->
<!--              <v-icon>mdi-bitcoin</v-icon>-->
<!--            </v-list-item-action>-->
          </template>
        </v-autocomplete>
<!--        <v-text-field-->
<!--          class="search-field mt-7"-->
<!--          label="Search by rare disease name or orpha/icd10 code ..."-->
<!--          height="80px"-->
<!--          outlined-->
<!--          filled-->
<!--          solo-->
<!--          background-color="white"-->
<!--        ></v-text-field>-->
      </v-col>
      <v-col class="flex-grow-0">
        <v-btn class="ma-0" height="80px" @click="executeSearch" x-large tile color="rgb(68, 160, 252)">
          <v-icon x-large>
            mdi-magnify
          </v-icon>
        </v-btn>
      </v-col>
      <v-col class="flex-grow-0">
        <v-btn dark class="py-6" height="80px" x-large tile color="#1f3863" @click="showFilters = !showFilters">
          Filter Search
          <v-icon>
            mdi-chevron-down
          </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="showFilters" class="filter-class" dense>
      <v-col cols="12">
        <v-card dark color="#1f3863" height="100%" tile>
          <h3 class="pa-1 ml-1">
            Search Options
          </h3>
          <v-divider />
          <v-row class="px-3 pt-3">
            <v-col>
              <v-row>
                <v-col>
                  <p>Hierarchy/Classification</p>
                  <v-radio-group
                    v-model="hierarchy.current"
                    row
                  >
                    <v-radio
                      v-for="variation in hierarchy.variations"
                      :key="variation"
                      :label="variation"
                      :value="variation"
                      color="primary"
                    ></v-radio>
                  </v-radio-group>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card dark color="#1f3863" height="100%" tile>
          <h3 class="pa-1 ml-1">
            Metadata Filter Options
          </h3>
          <v-divider />
          <v-row class="px-3 pt-3">
            <v-col>
              <p>
                Resource Type(s)
              </p>
              <v-select
                v-model="value1"
                :items="items1"
                label="Select Item"
                multiple
              >
                <template v-slot:selection="{ item, index }">
                  <v-chip v-if="index === 0">
                    <span>{{ item }}</span>
                  </v-chip>
                  <span
                    v-if="index === 1"
                    class="grey--text text-caption"
                  >
                    (+{{ value1.length - 1 }} others)
                  </span>
                </template>
              </v-select>
            </v-col>
            <v-col>
              <p>
                Countries
              </p>
              <v-select
                v-model="value2"
                :items="items2"
                label="Select Item"
                multiple
              >
                <template v-slot:selection="{ item, index }">
                  <v-chip v-if="index === 0">
                    <span>{{ item }}</span>
                  </v-chip>
                  <span
                    v-if="index === 1"
                    class="grey--text text-caption"
                  >
          (+{{ value2.length - 1 }} others)
        </span>
                </template>
              </v-select>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col cols="12">
        <v-card dark color="#1f3863" height="100%" tile>
          <h3 class="pa-1 ml-1">
            Record Interrogation Filter Options
          </h3>
          <v-divider />
          <v-row class="px-3 pt-3">
            <v-col>
              <p>
                Sex
              </p>
              <v-row style="margin-top: -30px;">
                <v-col v-for="s in sex" :key="sex.type">
                  <v-checkbox
                    v-model="s.checked"
                    :label="s.type"
                    color="blue"
                    :value="s.checked"
                    hide-details
                  ></v-checkbox>
                </v-col>
              </v-row>
              <p class="mt-2">
                Symptom Onset
              </p>
              <v-range-slider
                color="primary"
                v-model="symptomOnset.range"
                :max="symptomOnset.max"
                :min="symptomOnset.min"
                hide-details
                class="align-center"
              >
                <template v-slot:thumb-label="props">
                  {{ props.value }}
                </template>
              </v-range-slider>
            </v-col>
            <v-col>
              <p>
                Age this year
              </p>
              <v-range-slider
                color="primary"
                v-model="ageThisYear.range"
                :max="ageThisYear.max"
                :min="ageThisYear.min"
                hide-details
                class="align-center"
              >
                <template v-slot:thumb-label="props">
                  {{ props.value }}
                </template>
              </v-range-slider>
              <p>
                Age at diagnosis
              </p>
              <v-range-slider
                color="primary"
                v-model="ageAtDiagnosis.range"
                :max="ageAtDiagnosis.max"
                :min="ageAtDiagnosis.min"
                hide-details
                class="align-center"
              >
                <template v-slot:thumb-label="props">
                  {{ props.value }}
                </template>
              </v-range-slider>
            </v-col>
          </v-row>
        </v-card>
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

.filter-class {
  margin-top: -20px;
  transition: max-height 4s ease-in-out, width 3s ease-in-out, margin-left 3s ease-in-out;
}

.search-field {
  border-radius: 0;
}

.filter-button {
  height: 100%;
}
</style>
