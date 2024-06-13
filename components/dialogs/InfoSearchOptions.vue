<template>

    <v-dialog v-model="dialog" width="auto">
      <template v-slot:activator="{ on, attrs }">

        <v-icon large v-bind="attrs" v-on="on">
          mdi-information-outline
        </v-icon>
      </template>
      <v-card>
        <v-card-title>
          Search Options
        </v-card-title>
        <v-card-text>
          <div><h4> You can search using the following:</h4> </div><br>

          <v-row>
            <v-col cols="12">
              <div><h4>For Diseases</h4></div>
              <v-chip-group>
                <v-chip>Disease name</v-chip>
                <v-chip>ORPHAcode</v-chip>
                <v-chip>ICD-10 Code</v-chip>
                <v-chip>OMIM</v-chip>
              </v-chip-group>
            </v-col>
            <v-col cols="12">
              <div><h4>For Genes</h4></div>
              <v-chip-group>
                <v-chip>Gene name</v-chip>
                <v-chip>Gene symbol (HGNC)</v-chip>
              </v-chip-group>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn class="ms-auto" text @click="dialog = false">Ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

</template>

<script>
export default {
  name: "InfoSearchOptions",
  data () {
    return {
      dialog: false,
    }
  },
}
</script>

<style>

</style>
