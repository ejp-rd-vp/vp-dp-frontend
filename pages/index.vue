<script xmlns="http://www.w3.org/1999/html">
import DiscoverySearch from "@/components/search/DiscoverySearch.vue";
import DiscoverySearchWithAutoComplete from "@/components/search/DiscoverySearchWithAutoComplete.vue";
import Flashcards from "~/components/Flashcards.vue";
import InfoSearchOptions from "@/components/dialogs/InfoSearchOptions.vue";
import BasicSearchOptions from "@/components/dialogs/BasicSearchOptions.vue";
import AdvancedSearchOptions from "@/components/dialogs/AdvancedSearchOptions.vue";

export default {
  components: {
    AdvancedSearchOptions,
    BasicSearchOptions, InfoSearchOptions, DiscoverySearchWithAutoComplete, DiscoverySearch, Flashcards },
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
          text: 'Explore Rare Disease resources with the EJP RD Mind Map'
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
      ],
      items: [
        {
          src: require ('assets/images/logo/ejp-rd-logo-small.png'),
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
  <v-container>
    <!-- <div class="background">-->
    <v-row class="mt-12">
      <v-col class="text-center align-center" style="font-size: max(1vw, 20px);">
        <h1 class="pb-4 text-center" >
          Welcome to the EJP RD <strong>Virtual Platform Portal!</strong>
        </h1>
        <p>
          Search platform for clinical researchers specializing in rare diseases facilitating resource discovery
        </p>
      </v-col>
    </v-row>

    <v-row justify="center" class="mt-14">
      <v-icon large color="blue">mdi-arrow-down</v-icon>
      <a href="#searchsection" class="v-btn v-btn--primary text-decoration-underline mr-16" >
        Start your Search
      </a>
      <v-icon large color="blue">mdi-motion-play</v-icon>
      <a href="/about" class="v-btn v-btn--primary text-decoration-underline">
        Learn More
      </a>
    </v-row>
    <v-row justify="space-around" class="mt-16" style="margin-bottom: 180px;" id="searchsection">
      <v-col class="text-center" cols="12" sm="3">
        <v-icon large>mdi-magnify</v-icon>
        <div>Search for a rare disease of your interest</div>
      </v-col>
      <v-col class="text-center" cols="12" sm="3">
        <v-icon large>mdi-filter</v-icon>
        <div>Filter resources by type, country and patient data</div>
      </v-col>
      <v-col class="text-center" cols="12" sm="3">
        <v-icon large>mdi-book-open-page-variant</v-icon>
        <div>Discover a variety of rare disease resources</div>
      </v-col>
      <v-col class="text-center" cols="12" sm="3">
        <v-icon large>mdi-molecule</v-icon>
        <div>Explore related rare diseases to your disease of interest</div>
      </v-col>
    </v-row>
    <div id="searchsection">
    <v-row class="mt-12" >
      <v-col cols="12" style="background-color: #f3f3f3;">
        <h3>
          Discover rare diseases resources and data:
        </h3>
        <DiscoverySearchWithAutoComplete
          :reload-needed="false"
          :hide-filters-button="true"
          @codeObjectIsSelected="addObjectAndForwardToDiscoveryPage($event)"
        />
        <div>
         <p><strong>Need guidance?</strong> Search Options <InfoSearchOptions/> Basic Search <BasicSearchOptions/> Advanced Search <AdvancedSearchOptions/></p>
          <a href="/discovery">Advanced Search</a> to filter by specific criteria
        </div>
      </v-col>
    </v-row>
    </div>
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
      <v-row class="mt-12" style="margin-bottom: 130px;">
        <v-col cols="12">
          <Flashcards/>
        </v-col>
      </v-row>
      <v-row class="mb-12" style="background-color: rgb(188,215,243)">
        <v-col cols="12">
        <h2> What is the Virtual Platform?</h2>
        </v-col>
        <v-col cols="12">
        <p> The Virtual Portal allows you to search the Virtual Platform(VP) at once in real time to find resources of interest to your research.
          The VP is a growing network of Findable, Accessible, Interoperable and Reusable(FAIR) resources, ready to serve the rare disease(RD) research community</p>
        </v-col>

        <v-col cols="12" sm="4">
          <p> The VP also offers you:</p>
          <ul>
            <li><strong>Guidance</strong> on how to make your data more FAIR </li>
            <v-icon large color="#1976D2">mdi-launch</v-icon> <a href="https://www.ejprarediseases.org/fairification/" class="text-decoration-underline mr-16">Access information to  make rare disease resources FAIR</a>
            <li><strong>Connection</strong> of your rare disease resource to the VP </li>
            <v-icon large color="#1976D2" >mdi-launch</v-icon> <a href="https://www.ejprarediseases.org/fairification/" class="text-decoration-underline mr-16">Learn how to connect your rare disease resource to the VP</a>
          </ul>
        </v-col>
        <v-col cols="12" sm="2">
          <v-img :src="require('../assets/images/logo/img.png')"/>
        </v-col>

      </v-row>
      <v-row class="mb-4">
        <v-col cols="12">
        <h2> About EJP RD</h2>
        </v-col>
        <v-col cols="2" sm="1">
          <v-img :src="require('../assets/images/logo/ejp-rd-logo-small.png')" class="resize-image" />
        </v-col>
        <v-col cols="10">
        <p> The European Joint Programm on Rare Diseases (EJP RD) is a programme aiming to create an effective rare diseases research ecosystem for progress, innovation and for the benefit of everyone with a rare disease.
          We support rare diseases stakeholders by funding research, bringing together data resources & Tools, providing dedicated training courses, and translationg high quality research into effective treatments. <v-icon large color="#1976D2">mdi-launch</v-icon> <a href="https://www.ejprarediseases.org/" class=" text-decoration-underline mr-16" >
            Learn more about EJP RD</a> </p>
        </v-col>
      </v-row>

      <v-row class="mb-12">
        <v-col cols="12">
        <h2> Got questions?</h2>
        </v-col>
        <v-col cols="12">
       <p> Get answers to common questions, such as the benefits of logging in, in our  <a href="https://vp.ejprarediseases.org/about" class="text-decoration-underline mr-16" style="margin-left: 8px;"> FAQ section</a></p>
        </v-col>
      </v-row>
    </v-row>
  </v-container>

</template>
<style>
.background {
  background-color: #a7d5ed;
  border-bottom-left-radius: 100% 10%;
  border-bottom-right-radius: 100% 10%;
}
 .resize-image {
   max-width: 90px;
   max-height: 90px;
 }
</style>
