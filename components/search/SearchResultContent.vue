<script>
export default {
  props: {
    resultContent: { required: true, type: Array }
  },
  data () {
    return {
      headers: [
        { text: 'Type', value: 'type' },
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
  methods: {
    getCountry(item) {
      if(item['location']) {
        return  item.location.country
      }
      else if (item['publisher'] && item.publisher['location']) {
        return item.publisher.location.id
      }
      else {
        return '-'
      }
    }
  }
}
</script>

<template>

  <v-data-table
    class="mx-0 px-0"
    :headers="headers"
    :items="resultContent"
    fixed-header
    item-key="name"
    disable-sort
  >
    <template v-slot:item.type="{ item }">
      <v-card :href="item.homepage" target="_blank"  outlined color="transparent">
        <div class="text-center d-inline align-center justify-space-around">
          <v-tooltip v-if="item.type === 'PatientRegistryDataset'" bottom>
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
            <span>This resource is a patient information registry.</span>
          </v-tooltip>
          <v-tooltip v-if="item.type === 'cell line'" bottom>
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
          <v-tooltip v-if="item.type === 'Dataset'" bottom>
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
          <v-tooltip v-if="item.type === 'Guideline'" bottom>
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
          <v-tooltip v-if="item.type === 'BiobankDataset'" bottom>
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
            <span>The resource is a biobank and contains biological samples.</span>
          </v-tooltip>
        </div>
      </v-card>
    </template>
    <template v-slot:item.name="{ item }">
      <v-card :href="item.homepage" target="_blank"  outlined color="transparent" style="width: 200px;" class="py-1">
        {{ item.name }}
      </v-card>
    </template>
    <template v-slot:item.description="{ item }">
      <v-card :href="item.homepage" target="_blank" outlined color="transparent" >
        {{ item.description ? item.description : '-' }}
      </v-card>
    </template>
    <template v-slot:item.country="{ item }">
      <v-card :href="item.homepage" target="_blank" outlined color="transparent">
        {{ getCountry(item) }}
      </v-card>
    </template>
  </v-data-table>
</template>
