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
  methods: {
    truncate(input) {
      if (input.length > 12) {
        return input.substring(0, 12) + '...';
      }
      return input;
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
      <v-card :href="item.homepage" target="_blank"  outlined color="transparent" height="100%" style="width: 150px;" class="pt-3">
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
            <span>This resource is a patient registry.</span>
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
            <span>The resource is a biobank.</span>
          </v-tooltip>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
        <span
          class="ml-1"
          v-bind="attrs"
          v-on="on"
        >{{ truncate(item.name) }}</span>
            </template>
            <span>{{ item.name }}</span>
          </v-tooltip>
        </div>
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

<style scoped>
.v-card--link:before {
  background: none;
}

.item-name {
  color: black;
  display: inline-block;
  text-overflow: ellipsis;
  overflow: hidden !important;
  width: 150px;
  white-space: nowrap;
}
</style>
