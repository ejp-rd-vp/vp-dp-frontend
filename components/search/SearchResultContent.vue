<script>
export default {
  props: {
    resultContent: { required: true, type: Array }
  },
  data () {
    return {
      headers: [
        {
          text: 'Resource Name',
          align: 'start',
          value: 'name',
        },
        { text: 'Description', value: 'description' },
        { text: 'Country', value: 'country' }
      ]
    }
  },
}
</script>

<template>
  <v-data-table
    class="mx-0 px-0"
    :headers="headers"
    :items="resultContent"
    fixed-header
    height="250px"
    hide-default-footer
    item-key="name"
    disable-sort
    :footer-props="{
      showFirstLastPage: true,
      firstIcon: 'mdi-arrow-collapse-left',
      lastIcon: 'mdi-arrow-collapse-right',
      prevIcon: 'mdi-minus',
      nextIcon: 'mdi-plus'
    }"
  >
    <template v-slot:item.name="{ item }">
      <v-card :href="item.homepage" target="_blank"  outlined color="transparent" height="100%" class="pt-3">
        <v-tooltip v-if="item.type.toLowerCase() === 'PatientRegistryDataset'" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              :color="'green'"
              large
              v-bind="attrs"
              v-on="on"
              small
            >
              mdi-clipboard-text-search-outline
            </v-icon>
          </template>
          <span>This resource is a patient registry.</span>
        </v-tooltip>
        <v-tooltip v-if="item.type.toLowerCase() === 'cell line'" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              :color="'orange'"
              large
              v-bind="attrs"
              v-on="on"
              small
            >
              mdi-gesture
            </v-icon>
          </template>
          <span>This resource is a cell line.</span>
        </v-tooltip>
        <v-tooltip v-if="item.type.toLowerCase() === 'BiobankDataset'" bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-icon
              :color="'blue'"
              large
              v-bind="attrs"
              v-on="on"
              small
            >
              mdi-test-tube
            </v-icon>
          </template>
          <span>The resource is a biobank.</span>
        </v-tooltip>
        {{ item.name }}
      </v-card>
    </template>
    <template v-slot:item.description="{ item }">
      <v-card :href="item.homepage" target="_blank" outlined color="transparent">
        {{ item.description }}
      </v-card>
    </template>
    <template v-slot:item.country="{ item }">
      <v-card :href="item.homepage" target="_blank" outlined color="transparent">
        {{ item.country }}
      </v-card>
    </template>
  </v-data-table>
</template>
