<template>
  <v-container>
    <v-row no-gutters justify="center" align="center">
      <v-col cols="12" v-for="(source, index) in sources" :key="index">
        <v-card :href="source.resourceHomePage" target="_blank" class="low-opacity-without-hover" tile outlined width="100%">
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
                <h3 v-if="!source.logo"> {{ source.resourceName }}</h3>
                <v-img :src="logos[source.resourceName]" contain max-width="200px" max-height="100px" />
              </v-list-item-title>
              <v-list-item-subtitle class="mb-1">{{ source.resourceDescription }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar
              width="300px"
              height="150px"
            >
              <v-row justify="end">
                <v-col v-if="source.resourceType.includes('catalogue')" class="flex-grow-0">
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
                <v-col v-if="source.resourceType.includes('patientRegistry')" class="flex-grow-0">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        :color="'green'"
                        large
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-clipboard-text-search-outline
                      </v-icon>
                    </template>
                    <span>The source is a registry or a network of registries.</span>
                  </v-tooltip>
                </v-col>
                <v-col v-if="source.resourceType.includes('knowledgeBase')" class="flex-grow-0">
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
                        VpContentDiscovery
                      </v-chip>
                    </template>
                    <span>The source is queryable via the VP Portal.</span>
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
  opacity: 0.9;
  &:hover {
    opacity: 1;
  }
}

</style>

<script>
export default {
  name: 'IndexPage',
  data () {
    return {
      logos: {
        'ERKReg': require('../assets/images/logo/resources/erkreg-logo.png'),
        'BBMRI-Eric': require('../assets/images/logo/resources/bbmri-logo.png'),
        'Orphanet': require('../assets/images/logo/resources/img_4.png'),
        'Cellosaurus': require('../assets/images/logo/resources/cellosaurus-logo.png'),
        'wikiPathways': require('../assets/images/logo/resources/img_5.png'),
        'hPSCreg': require('../assets/images/logo/resources/img_3.png')
      },
      vpIndexUrl: 'https://qb-index.ejprd.semlab-leiden.nl/catalogues',
      sources: []
    }
  },
  methods: {
    async fetchSources () {
      await this.$axios.$get('/queryApi/resources')
        .then(function (res) {
          this.sources = res
        }.bind(this))
    }
  },
  beforeMount() {
    this.fetchSources()
  }
}
</script>
