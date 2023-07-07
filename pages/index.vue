<script>
import DiscoverySearch from "@/components/search/DiscoverySearch.vue";
import DiscoverySearchWithAutoComplete from "@/components/search/DiscoverySearchWithAutoComplete.vue";

export default {
  components: { DiscoverySearchWithAutoComplete, DiscoverySearch },
  data () {
    return {
      searchQuery: '',
      colors: [
        'indigo',
        'warning',
        'pink darken-2',
        'red lighten-1',
        'deep-purple accent-4',
      ],
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ],
      tools: [
        {
          icon: 'mdi-arrow-right-circle-outline',
          buttonText: 'EXPLORE',
          buttonColor: '#e31a46',
          url: 'https://resourcemap.ejprarediseases.org/#/',
          text: 'Explore Rare Disease resources with the EJP Mind Map'
        },
        {
          icon: 'mdi-sync',
          buttonText: 'GUIDANCE',
          buttonColor: '#fecf00',
          url: 'https://www.ejprarediseases.org/fairification',
          text: 'Find out how to make your data more FAIR'
        },
        {
          icon: 'mdi-gesture-double-tap',
          buttonText: 'CONNECT',
          buttonColor: '#3bb392',
          url: 'https://forms.office.com/r/UrgvkD39t8',
          text: 'Contact us for information or feedback'
        }
      ]
    }
  },
  methods: {
    addObjectAndForwardToDiscoveryPage(codeObject) {
      this.$store.commit('setSelectedObject', codeObject)
      this.$router.push({ path: '/discovery' })
    }
  }

}
</script>

<template>
  <div>
    <v-container>
      <v-row class="mt-12">
        <v-col cols="12" sm="6" style="font-size: max(1vw, 20px);">
          <h1 class="pb-4">
            The EJP-RD Virtual Platform
          </h1>
          <p>
            The Virtual Platform (VP) is a growing <b>network</b> of Findable, Accessible, Interoperable and Reusable (FAIR) resources, ready to serve the rare disease (RD) research community.
          </p>
          <p>
            It includes catalogues of resources, registries, biobanks, knowledge bases and tools compliant with agreed standards.
          </p>
          <p>
            The <b>VP Portal</b> allows you to search the VP network resources at once in real time to find those of interest to your research.
          </p>
          <p>
            <a href="/about" style="text-decoration: none">Learn More</a>
          </p>
        </v-col>
        <v-col cols="12" sm="6">
          <v-img :src="require('../assets/images/others/vp-parts.png')" contain height="500px" />
        </v-col>
      </v-row>
      <v-row class="mt-12">
        <v-col cols="12" style="background-color: #f3f3f3">
          <h3>
            Discover rare diseases resources and data:
          </h3>
          <DiscoverySearchWithAutoComplete
            :reload-needed="false"
            :hide-filters-button="true"
            @codeObjectIsSelected="addObjectAndForwardToDiscoveryPage($event)"
          />
          <p>
            <a href="/discovery">Advanced Search</a> to filter by specific criteria
          </p>
        </v-col>
      </v-row>
      <v-row class="mt-12" style="margin-bottom: 180px;">
        <v-col cols="12">
          <h3>
            Tools and Resources
          </h3>
        </v-col>
        <v-col class="text-center" cols="12" sm="4" v-for="tool in tools" :key="tool.buttonText">
          <v-icon v-if="tool.icon" class="black--text mb-6 align-center justify-center" size="120px">
            {{ tool.icon }}
          </v-icon>
          <v-img v-if="tool.img" class="mt-4 mb-6" style="display: inline-block;" :src="tool.img" contain max-width="200px" max-height="100px" />
          <v-btn :href="tool.url" target="_blank" f large width="100%" :color="tool.buttonColor" class="white--text mb-2">
            {{ tool.buttonText }}
          </v-btn>
          <p style="font-size: max(0.6vw, 20px);">
            {{ tool.text }}
          </p>
        </v-col>
      </v-row>
<!--      <v-row class="mt-12">-->
<!--        <v-col cols="12">-->
<!--          <v-carousel-->
<!--            cycle-->
<!--            height="400"-->
<!--            hide-delimiter-background-->
<!--            show-arrows-on-hover-->
<!--          >-->
<!--            <v-carousel-item-->
<!--              v-for="(slide, i) in slides"-->
<!--              :key="i"-->
<!--            >-->
<!--              <v-sheet-->
<!--                :color="colors[i]"-->
<!--                height="100%"-->
<!--              >-->
<!--                <v-row-->
<!--                  class="fill-height"-->
<!--                  align="center"-->
<!--                  justify="center"-->
<!--                >-->
<!--                  <div class="text-h2">-->
<!--                    {{ slide }} Slide-->
<!--                  </div>-->
<!--                </v-row>-->
<!--              </v-sheet>-->
<!--            </v-carousel-item>-->
<!--          </v-carousel>-->
<!--        </v-col>-->
<!--      </v-row>-->
    </v-container>
  </div>
</template>
