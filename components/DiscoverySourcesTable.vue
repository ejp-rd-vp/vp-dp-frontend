<template>
  <v-container>
    <v-row no-gutters justify="center" align="center">
      <v-col cols="12" v-for="(source, index) in sources" :key="index">
        <v-card :href="source.catalogueAddress" target="_blank" class="low-opacity-without-hover" tile outlined width="100%">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon
                      small
                      color="green"
                      v-bind="attrs"
                      v-on="on"
                    >mdi-connection</v-icon>
                  </template>
                  <span>The source is actively connected to the VP.</span>
                </v-tooltip>
                <h3 v-if="!source.logo"> {{ source.catalogueName }}</h3>
                <v-img v-if="source.logo" :src="source.logo" contain max-width="200px" max-height="100px" />
              </v-list-item-title>
              <v-list-item-subtitle class="mb-1">{{ source.catalogueDescription }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar
              width="300px"
              height="150px"
            >
              <v-row justify="end">
                <v-col v-if="source.catalogueType.includes('catalogue')" class="flex-grow-0">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        :color="'red'"
                        large
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-notebook-multiple
                      </v-icon>
                    </template>
                    <span>The source is a registry or a network of registries.</span>
                  </v-tooltip>
                </v-col>
                <v-col v-if="source.catalogueType.includes('registry')" class="flex-grow-0">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        :color="'green'"
                        large
                        v-bind="attrs"
                        v-on="on"
                      >
                        clipboard-text-search-outline
                      </v-icon>
                    </template>
                    <span>The source is a registry or a network of registries.</span>
                  </v-tooltip>
                </v-col>
                <v-col v-if="source.catalogueType.includes('knowledge')" class="flex-grow-0">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        :color="'orange'"
                        large
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-lightbulb-on-outline
                      </v-icon>
                    </template>
                    <span>This source hold knowledge on rare diseases.</span>
                  </v-tooltip>
                </v-col>
                <v-col v-if="source.queryable" class="flex-grow-0">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-chip
                        class="mr-3"
                        color="lightblue"
                        label
                        outlined
                        v-bind="attrs"
                        v-on="on"
                      >
                        VP Queryable
                      </v-chip>
                    </template>
                    <span>The source is queryable via the VP Discovery Portal.</span>
                  </v-tooltip>
                </v-col>
              </v-row>
            </v-list-item-avatar>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">

v-avatar {
  border-radius: 0;
  align-items: center;
}
.connected-icon {
  position: relative;
  vertical-align: middle;
  margin: 0 10px;
  height: 20px;
}

.low-opacity-without-hover {
  opacity: 90%;
  &:hover {
    opacity: 100%;
  }
}

</style>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      vpIndexUrl: 'https://qb-index.ejprd.semlab-leiden.nl/catalogues',
      sources: []
    }
  },
  methods: {
    async fetchSources () {
      await this.$axios.$get(this.vpIndexUrl)
        .then(function (res) {
          // TODO source.queryable should be delivered from the backend
          for (let i = 0; i < res.length; i++) {
            res[i].queryable = this.sourceIsQueryable(res[i])
          }
          this.sources = res
        }.bind(this))
    },
    sourceIsQueryable (source) {
      for (let i = 0; i < source.theme.length; i++) {
        if (source.theme[i].toLowerCase().includes('queryable')) {
          return true;
        }
      }
      return false;
    }
  },
  beforeMount() {
    this.fetchSources()
  }
}
</script>
