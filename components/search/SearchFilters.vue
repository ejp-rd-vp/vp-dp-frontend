<script>
import Countries from '~/assets/js/countries';

export default {
  data() {
    return {
      searchParams: {
        resourceTypes: [],
        countries: [],
        genders: [],
        ageThisYear: [0,100],
        symptomOnset: [0,100],
        ageAtDiagnoses: [0,100],
      },
      items1: ['Patient Registries', 'Biobanks', 'Dataset','Catalog', 'Guidelines' ],
      value1: ['Patient Registries', 'Biobanks', 'Dataset','Catalog', 'Guidelines'],
      items2: Countries.euCountriesNames(),
      value2: Countries.euCountriesNames(),
      symptomOnset: {
        min: 0,
        max: 100
      },
      ageThisYear: {
        min: 0,
        max: 100
      },
      ageAtDiagnosis: {
        min: 0,
        max: 100
      },
      sexes: [
        {
          type: 'FEMALE',
          checked: true
        },
        {
          type: 'MALE',
          checked: true
        },
        {
          type: 'UNDETERMINED',
          checked: true
        },
        {
          type: 'UNKNOWN',
          checked: true
        }
      ]
    }
  },
  computed: {
    loggedIn () {
      return this.$auth.loggedIn
    },
    selectAllCountriesIcon () {
      if (this.allCountriesAreSelected) return 'mdi-close-box'
      if (this.someCountriesAreSelected) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
    allCountriesAreSelected() {
      return this.items2.length === this.value2.length
    },
    someCountriesAreSelected() {
      return this.value2.length > 0 && !this.allCountriesAreSelected
    }
  },
  watch: {
    searchParams: {
      handler () {
        this.$emit('updateSearchParams', this.searchParams)
      },
      deep: true,
      immediate: true
    },
    sexes: {
      handler () {
        let checkedSexes = []
        for (let sex of this.sexes) {
          if (sex.checked) {
            checkedSexes.push(sex.type)
          }
        }
        this.searchParams.sexes = checkedSexes
      },
      deep: true,
      immediate: true
    },
    value1: {
      handler () {
        let newTypes = []
        for (let type of this.value1) {
          if (type.toLowerCase() === 'patient registries') {
            newTypes.push('PATIENT_REGISTRY')
          }
          if (type.toLowerCase() === 'biobanks') {
            newTypes.push('BIO_BANK')
          }
          if (type.toLowerCase() === 'Dataset') {
            newTypes.push('DATASET')
          }
          if (type.toLowerCase() === 'Catalog') {
            newTypes.push('CATALOG')
          }
          if (type.toLowerCase() === 'Guidelines') {
            newTypes.push('GUIDELINES')
          }

        }
        this.searchParams.resourceTypes = newTypes
      },
      deep: true,
      immediate: true
    },
    value2: {
      handler () {
        this.searchParams.countries = Countries.euCountriesNamesToCodes(this.value2)
      },
      deep: true,
      immediate: true
    },
  },
  methods: {
    selectOrUnselectAllCountries () {
      this.$nextTick(() => {
        if (this.allCountriesAreSelected) {
          this.value2 = []
        } else {
          this.value2 = this.items2
        }
      })
    }
  }
}
</script>

<template>
  <v-container>
    <v-row class="filter-class" dense>
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
                <template v-slot:prepend-item>
                  <v-list-item
                    ripple
                    @mousedown.prevent
                    @click="selectOrUnselectAllCountries"
                  >
                    <v-list-item-action>
                      <v-icon :color="items2.length > 0 ? 'primary' : ''">
                        {{ selectAllCountriesIcon }}
                      </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title>
                        Select All
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="mt-2"></v-divider>
                </template>
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
        <v-card :disabled="!loggedIn" dark color="#1f3863" height="100%" tile>
          <h3 class="pa-1 ml-1">
            <v-icon v-if="!loggedIn">
              mdi-lock
            </v-icon>
            Record Interrogation Filter Options
            <v-chip
              v-if="!loggedIn"
              outlined
              color="red"
            >
              Please log in to activate these filters
            </v-chip>
          </h3>
          <v-divider />
          <v-row class="px-3 pt-3">
            <v-col>
              <p>
                Sex
              </p>
              <v-row style="margin-top: -30px;">
                <v-col v-for="s in sexes" :key="sexes.type">
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
                v-model="searchParams.symptomOnset"
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
                v-model="searchParams.ageThisYear"
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
                v-model="searchParams.ageAtDiagnoses"
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

<style scoped>
.filter-class {
  transition: max-height 4s ease-in-out, width 3s ease-in-out, margin-left 3s ease-in-out;
}
</style>
