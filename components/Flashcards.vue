<script>
export default {
  name: "Flashcards",
  data () {
    return {
      colors: [
        'purple lighten-2',
        'yellow darken-3',
        'blue ',
        'pink lighten-1',

        'lime darken-3',
        'red lighten-1',
        'green darken-1',
        'deep-orange darken-1',



      ],
      slides: [
        'As a clinical researcher I would like to\tknow if there is already data about my patient in GPAP\tso that\tI can check whether their data is already submitted to GPAP\n',
        'As a clinical researcher I would like to\tknow if there is already data about my patient in GPAP\tso that\tI can study the phenotype information associated with the genome of my patient\n',
        'As a data scientist I would like to\ttrain AI models on combined datasets from GPAP and patient registries\tso that\tI can discover the mean age of patients with a specific profile\n',
        'As a data steward I would like to\toffer discovery of data use conditions about my patient registry data\tso that\tmore researchers know how they can use this data in their work\n',
        'As a clinical researcher I would like to\tsee or filter on data use conditions\tso that\tI can quickly identify data sources I am allowed to use in my research\n',
        'As a data steward I would like to\tgenerate a FAIRification plan\tso that\tadvise colleagues building the system architecture\n',
        'As a data scientist I would like to\tdevelop a computational workflow that can be used for multiple types of data sets\tso that\tI can design an umbrella study that covers multiple types of diseases\n',
        'As a clinical researcher I would like to\tknow the addresses of all hospitals that see patients with LGMD in Italy\tso that\tI can contact them with the latest standards of care\n'
      ],
    }
  },
}
</script>

<template>
  <v-carousel
    cycle
    height="400"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item
      v-for="(slide, i) in slides"
      :key="i"
    >
      <v-sheet
        :color="colors[i]"
        height="100%"
      >
        <v-row
          class="fill-height"
          align="center"
          justify="center"
        >
          <div class="flashcards-h2">
            <div>
            {{ slide }}
            </div>
          </div>
        </v-row>
      </v-sheet>
    </v-carousel-item>
  </v-carousel>
  </template>


<style scoped lang="scss">

.flashcards-h2 {
  font-size: 50px;
  text-align: center;
  color: white;
  padding: 2rem;
  margin: 0 1rem;

}

</style>
