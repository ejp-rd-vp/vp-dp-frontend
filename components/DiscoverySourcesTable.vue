   <template>
  <v-container>
    <v-row no-gutters justify="center" align="center">
      <v-col cols="12" v-for="(source, index) in sources" :key="index">
        <v-card :href="source.resourceHomePage" target="_blank" class="low-opacity-without-hover" tile outlined width="100%">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                <v-tooltip v-if="source.queryable" bottom>
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
                <h3 v-if="!source.logo && !logos[source.resourceName]"> {{ source.resourceName }}</h3>
                <v-img v-if="logos[source.resourceName]" :src="logos[source.resourceName]" contain max-width="180px" max-height="150px" />
                <v-img v-if="!logos[source.resourceName] && source.logo" :src="source.logo" contain max-width="180px" max-height="150px" />
              </v-list-item-title>
              <v-list-item-subtitle class="mb-1">{{ source.resourceDescription }}</v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-avatar
              width="300px"
              height="150px"
            >
              <v-row justify="end">
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
                <v-col v-if="source.resourceType.length > 1 || source.resourceType.includes('CATALOG')" class="flex-grow-0">
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
                <v-col v-else-if="source.resourceType.includes('PATIENT_REGISTRY')" class="flex-grow-0">
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
                    <span>The source is a patient information register.</span>
                  </v-tooltip>
                </v-col>
                <v-col v-else-if="source.resourceType.includes('DATASET')" class="flex-grow-0">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        :color="'orange'"
                        large
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-database-search-outline
                      </v-icon>
                    </template>
                    <span>This source hold knowledge on rare diseases.</span>
                  </v-tooltip>
                </v-col>
                <v-col v-else-if="source.resourceType.includes('GUIDELINE')" class="flex-grow-0">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        :color="'yellow'"
                        large
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-book-check-outline
                      </v-icon>
                    </template>
                    <span>This source contains recommendations or instructions.</span>
                  </v-tooltip>
                </v-col>
                <v-col v-else-if="source.resourceType.includes('BIO_BANK')" class="flex-grow-0">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        :color="'blue'"
                        large
                        v-bind="attrs"
                        v-on="on"
                      >
                        mdi-test-tube
                      </v-icon>
                    </template>
                    <span>This source contains biological samples.</span>
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
        'WikiPathways': require('../assets/images/logo/resources/img_5.png'),
        'hPSCreg': require('../assets/images/logo/resources/img_3.png'),
        'EuRRECa': require('../assets/images/logo/resources/eurreca-logo.png'),
        'Genturis': require('../assets/images/logo/resources/Genturis.png'),
        'DDP': require('../assets/images/logo/resources/img_1.png'),
      },
      sources: []
    }
  },
  methods: {
    async fetchSources () {
      await this.$axios.$get('/api/v1/resources')
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
