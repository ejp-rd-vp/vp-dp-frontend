<template>

    <v-dialog v-model="dialog" width="auto">
      <template v-slot:activator="{ on, attrs }">
        <v-icon large v-bind="attrs" v-on="on">
          mdi-information-outline
        </v-icon>
      </template>
      <v-card>
        <v-card-title>
           Basic Search
        </v-card-title>
        <v-card-text>
          <h4> The basic search function allows you to enter a disease or gene in the search bar using various search options. The portal will sugget options for you to choose from
          upon which you receive results after selection. You can apply additional filters to refine your search.</h4> <br>
          <div class="chip-div"><v-chip>ADPKD (Orpha:730) </v-chip> <v-icon large class="chip-icon">mdi-close</v-icon></div>

          <h4 class="mt-6">The search kann be cleared using the <v-icon large>mdi-close</v-icon> button on the search bar.</h4>
        </v-card-text>
        <v-card-actions>
          <v-btn class="ms-auto" text @click="dialog = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</template>

<script>
export default {
  name: "BasicSearchOptions",
  data () {
    return {
      dialog: false,
    }
  },
}
</script>

<style>
.chip-div {
  border-width: 1px;
  border-style: solid;
  border-color: #000000;
}
.chip-icon{
  margin-left: 750px;
}
</style>
