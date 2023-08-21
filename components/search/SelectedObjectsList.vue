<script>
import Common from "assets/js/common";
export default {
  props: {
    selectedCodesObjects: { required: false, default: () => [] }
  },
  data: () => ({
    tags: []
  }),
  methods: {
    deleteSelectedObjectByIndex(itemIndex) {
      this.tags.splice(itemIndex, 1)
      this.selectedCodesObjects.splice(itemIndex, 1)
      this.$emit('updateSelectedCodesObjects', Common.removeDuplicatesFromArray(this.selectedCodesObjects))
    }
  },
  watch: {
    selectedCodeObjects: {
      handler() {
        for (let selectedObject of this.selectedCodesObjects) {
          if (this.tags.filter(e => e.hgncId === selectedObject.hgncId || e.orphaCode === selectedObject.orphaCode).length > 0) continue
          this.tags.push(
            {
              hgncId: selectedObject.hgncId ? selectedObject.hgncId : -1,
              hgncSymbol: selectedObject.symbol ? selectedObject.symbol : -1,
              orphaCode: selectedObject.orphaCode !== '0' ? selectedObject.orphaCode : -1
            }
          )
        }
        this.tags = Common.removeDuplicatesFromArray(this.tags)
      },
      immediate: true
    }
  }
}
</script>

<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        sm="10"
        md="8"
      >
        <v-sheet
          elevation="0"
          style="background-color: transparent"
          class="py-4"
        >
          <span class="subheading">Selected codes:</span>
          <v-chip-group :key="tags.length">
            <v-chip
              v-for="(tag, index) in tags"
              :key="index"
            >
              {{ tag.orphaCode !== -1 ? 'orpha:' + tag.orphaCode : '' }} {{ tag.hgncId !== -1 ? 'hgnc-symbol:' + tag.hgncSymbol : '' }}
              <v-icon
                class="ml-1"
                @click="deleteSelectedObjectByIndex(index)"
                small
              >
                mdi-close-circle
              </v-icon>
            </v-chip>
          </v-chip-group>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
