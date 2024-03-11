<script>
import Common from '~/assets/js/common'
export default {
  props: {
    query: { required: false, default: '' }
  },
  data() {
    return {
      selected: [],
      params: {
        query: this.query,
        page: 0,
        size: 6
      },
      items: [],
    }
  },
  watch: {
    query: {
      handler () {
        this.fetchAutoCompletes()
      },
      immediate: true
    }
  },
  methods: {
    markAsSelected(item) {
      this.$emit('addSelectedCodesObjects', [item])
    },
    isGene(item) {
      return item.hgncId
    },
    autoCompleteText (item) {
      let finalTitle = item.name
      if (!this.isGene(item)) {
        if (this.query) {
          const filteredSynonymList =
            item.synonyms.split(',').filter(synonym => synonym.toLowerCase().includes(this.query.toLowerCase()))
          if (filteredSynonymList.length > 0) {
            finalTitle = '[' + filteredSynonymList + '] ' + finalTitle
          }
        }
      }
      return this.highlightMatchingSubString(finalTitle, this.query)
    },
    getCodeList (codes) {
      return codes && codes.length > 0 ? codes.split(',') : null
    },
    highlightMatchingSubString(str, subStr) {
      let reg = new RegExp('(' +subStr+ ')', 'gi');
      return  str.replace(reg, '<mark>$1</mark>');
    },
    async fetchAutoCompletes () {
      await this.$axios.$get('/api/v1/autocomplete',
        {
          params: this.params, paramsSerializer (params) { return Common.paramsSerializer(params) },
          headers: {}

        })
        .then(function (res) {
          if (res) {
            if (res.genes.length === 1) {
              this.items = res.genes
              this.items.push(...res.rareDiseases)
            } else {
              this.items = res.rareDiseases
              this.items.push(...res.genes)
            }
          }
        }.bind(this))
    }
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card
          v-if="items.length > 0"
        >
          <v-list
            style="max-height: 300px"
            class="overflow-y-auto"
            two-line
          >
            <v-list-item v-for="item in items" :key="item.title" style="cursor: pointer;">
              <v-list-item-content
                @click="markAsSelected(item)"
              >
                <v-list-item-title v-html="autoCompleteText(item)" />
                <v-list-item-subtitle>
                  <v-chip
                    class="mx-1 short"
                    color="grey"
                    label
                    outlined
                    small
                  >
                    <span v-if="!isGene(item)" v-html="'orpha:' + highlightMatchingSubString(item.orphaCode, query)"></span>
                    <span v-if="isGene(item)" v-html="'hgnc-symbol:' + highlightMatchingSubString(item.symbol, query)"></span>
                  </v-chip>
                  <v-chip
                    v-if="isGene(item)"
                    class="mx-1 short"
                    color="grey"
                    label
                    outlined
                    small
                  >
                    <span v-html="'hgnc-id:' + highlightMatchingSubString(item.hgncId, query)"></span>
                  </v-chip>
                  <v-chip
                    v-if="item.codes && query && code.toLowerCase().includes(query.toLowerCase())"
                    v-for="code in getCodeList(item.codes)"
                    :key="code"
                    class="mx-1 short"
                    color="grey"
                    label
                    outlined
                    small
                  >
                    <span v-html="highlightMatchingSubString(code, query)"></span>
                  </v-chip>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
        <v-card
          v-else
          class="text-center"
        >
          <p>No match could be found in the rare disease ontology or genes ontology for {{ this.query }}.</p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
