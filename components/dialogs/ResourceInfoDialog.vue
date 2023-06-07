<script>
export default {
  props: {
    resourceInfo: { required: true }
  },
  data () {
    return {
      dialog: true,
    }
  },
  watch: {
    dialog() {
      if(!this.dialog) {
        this.$emit('closeResourceInfoDialog')
      }
    }
  }
}
</script>

<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Resource Contact Information
        </v-card-title>
        <v-card-text>
          <v-card-title>Name: {{ resourceInfo.resourceName }}</v-card-title>
          <v-card-title>Homepage:</v-card-title>
          <v-card-subtitle>
            <a v-if="resourceInfo.resourceHomePage" :href="resourceInfo.resourceHomePage" target="_blank">
              {{ resourceInfo.resourceHomePage }}
            </a>
            <div v-else>
              Not Available
            </div>
          </v-card-subtitle>
          <v-card-title>Email:</v-card-title>
          <v-card-subtitle>
            <a v-if="resourceInfo.eMail" :href="'mailto:' + resourceInfo.eMail | lowercase">
              {{ resourceInfo.eMail }}
            </a>
            <div v-else>
              Not Available
            </div>
          </v-card-subtitle>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            large
            @click="dialog = false"
          >
            CLOSE
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
