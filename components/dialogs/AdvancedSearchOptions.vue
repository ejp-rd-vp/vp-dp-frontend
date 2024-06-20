<template>

    <v-dialog v-model="dialog" width="auto">
      <template v-slot:activator="{ on, attrs }">
        <v-icon large v-bind="attrs" v-on="on">
          mdi-information-outline
        </v-icon>
      </template>
      <v-card>
        <v-card-title>
           Advanced Search
        </v-card-title>
        <v-card-text>
          <h4> The advanced search feature allows you to to conduct highly customizable searches by combining multiple search terms.
            This uses the OR boolean operation, meaning you can get results that match any of your specified terms. The search</h4> <br>
          <div class="chip-div"><v-chip close >ADPKD (Orpha:730)</v-chip> <v-chip close >DMD (Orpha:98896)</v-chip> <v-icon large class="chipicon">mdi-close</v-icon></div>

          <h4 class="mt-6">means that the results will include any resources that match either ADPKD or DMD, or both</h4>
        </v-card-text>
        <v-card-actions>
          <v-btn class="ms-auto" text @click="dialog = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</template>

<script>
export default {
  name: "AdvancedSearchOptions",
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
.chipicon{
  margin-left: 550px;
}

</style>
