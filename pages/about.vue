<script>
import { marked } from 'marked'
import AboutPageText from '@/assets/md/about.md'

export default {
  name: 'About',
  data () {
    return {
      markdownText: AboutPageText
    }
  },
  computed: {
    markdownToHtml () {
      return marked(AboutPageText)
    }
  },
}
</script>

<template>
  <div class="main-container">
    <v-container>
      <v-row>
        <v-col>
          <v-btn href="/" class="mt-8 ml-12 home-button" color="#44a0fc" icon id="no-background-hover">
            <v-icon size="40">
              mdi-arrow-left
            </v-icon>
            <v-icon class="ml-6" size="40">
              mdi-home-outline
            </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="mt-10">
        <v-col>
          <div class="px-4 markdown-class" style="max-width: 700px;" v-html="markdownToHtml" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<style scoped lang="scss">

#no-background-hover::before {
  background-color: transparent !important;
}

.main-container {
  background: url("@/assets/images/others/dust_scratches.png");
  padding: 0 !important;
  margin: 0 !important;
  width: 100%;
  min-height: 101%;
}

.markdown-class {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-bottom: 100px;
  @media screen and (max-width: 1200px) {
    margin-bottom: 200px;
  }
  @media screen and (max-width: 950px) {
    margin-bottom: 280px;
  }
}


</style>
