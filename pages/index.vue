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
          buttonText: 'USING DATA',
          buttonColor: '#fecf00',
          url: 'https://www.ejprarediseases.org/fairification/',
          text: 'Find out how the VP can help you do research'
        },
        {
          icon: 'mdi-gesture-double-tap',
          buttonText: 'CONNECT',
          buttonColor: '#3bb392',
          url: 'https://forms.office.com/r/UrgvkD39t8',
          text: 'Contact us to connect your Rare  Disease resource  to  the Virtual  Platform'
        },
        {
          img: require('../assets/images/logo/smart-guidance.png'),
          buttonText: 'FAIRification Material',
          buttonColor: '#4a71af',
          url: 'https://smartguidance-rd.ds-wizard.org/ smart guidance tool',
          text: 'Get guidance how to make your registry mor FAIR'
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
            The Virtual Platform (VP) connects rare disease resources <br> to improve research and health care.
          </p>
          <p>
            The VP enables discovery and analysis of information and <br> scientific data about rare diseases, those affecting fewer <br> than 5 in 10,000 people.
          </p>
          <p>
            It also offers information to make rare disease resources
            <br><b>Findable, Accessible, Interoperable, and Reusable (FAIR).</b>
          </p>
        </v-col>
        <v-col cols="12" sm="6">
          <v-img :src="require('../assets/images/others/vp-parts.jpg')" contain height="500px" />
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
      <v-row class="mt-12" style="margin-bottom: 150px;">
        <v-col cols="12">
          <h3>
            Tools and Resources
          </h3>
        </v-col>
        <v-col class="text-center" cols="12" sm="3" v-for="tool in tools" :key="tool">
          <v-icon v-if="tool.icon" class="black--text mb-6 align-center justify-center" size="120px">
            {{ tool.icon }}
          </v-icon>
          <v-img v-if="tool.img" class="mt-4 mb-6" style="display: inline-block;" :src="tool.img" contain max-width="200px" max-height="100px" />
          <v-btn large width="100%" :color="tool.buttonColor" class="white--text">
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
    <v-footer absolute class="d-flex justify-space-around mt-4 pt-4">
      <p>
        <b>2020-2022 European Rare Diseases Joint Programme</b>
      </p>
      <div class="d-flex justify-center">
        <img class="mr-2" src="@/assets/images/logo/ejp-rd-logo-450.png" height="55px" />
        <img class="mr-2" src="@/assets/images/others/eu-emblem.jpg" height="55px" />
        <p style="font-size: 12px; line-height: 14px">
          This work is supported by the funding from <br>
          the European Union's Horizon 2020 research <br>
          and innovation programme under the EJP RD <br>
          COFUND-EJP N° 825575
        </p>
      </div>
      <p class="float-right">
        <a href="/imprint">
          <b>Imprint</b>
        </a>
      </p>
    </v-footer>
  </div>
</template>
