<script>
export default {
  data() {
    return {
      viewHeadlineHover: false,
    }
  }
}
</script>
<template>
  <v-container class="ma-0 pa-0" fluid fill-height>
    <v-btn dark tile color="#1f3863" class="feedback" href="https://forms.office.com/pages/responsepage.aspx?id=AcQ6OB2ia0KAcl90w2twk7fwO2KG6sVNroEUPM3X2sJUQ0g1SkY3WkQ0TTBHTU9QNThSMEhSN0VLUCQlQCN0PWcu" target="_blank">
      <v-icon class="mr-1">mdi-message-outline</v-icon>
      SEND US FEEDBACK
    </v-btn>
    <div class="hidden-md-and-up" style="background-color: #1f3863; width: 100%;">
      <v-row>
        <v-col>
          <a href="https://www.ejprarediseases.org/" target="_blank">
            <img width="300px" src="@/assets/images/logo/ejp-rd-logo-450.png">
          </a>
        </v-col>
        <v-col class="flex-grow-0 mr-4 mt-3">
          <v-menu offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                dark
                x-large
                v-bind="attrs"
                v-on="on"
              >
                mdi-view-headline
              </v-icon>
            </template>
            <v-list>
              <v-list-item-group>
                <v-list-item href="/discovery" style="color: #3bb392;">
                  <h5>Resource Discovery</h5>
                </v-list-item>
                <v-list-item href="https://www.ejprarediseases.org/fairification/" target="_blank" style="color: #e31a46;">
                  <h5>FAIRification</h5>
                </v-list-item>
                <v-list-item href="https://resourcemap.ejprarediseases.org/#/" target="_blank" style="color: #fecf00;">
                  <h5>RD Knowledge</h5>
                </v-list-item>
                <v-list-item href="/imprint" style="color: #44a0fc;">
                  <h5>Imprint</h5>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
    </div>
    <div class="hidden-sm-and-down">
      <a href="https://www.ejprarediseases.org/" target="_blank">
        <img class="logo" src="@/assets/images/logo/ejp-rd-logo-450.png">
      </a>
      <div
        @mouseover="viewHeadlineHover = true"
        @mouseleave="viewHeadlineHover = false"
      >
        <v-icon dark class="view-headline">mdi-view-headline</v-icon>
        <v-list v-if="viewHeadlineHover" class="view-headline-list">
          <v-list-item-group>
            <v-list-item href="/discovery" style="color: #3bb392;">
              <h5>Resource Discovery</h5>
            </v-list-item>
            <v-list-item href="https://www.ejprarediseases.org/fairification/" target="_blank" style="color: #e31a46;">
              <h5>FAIRification</h5>
            </v-list-item>
            <v-list-item href="https://resourcemap.ejprarediseases.org/#/" target="_blank" style="color: #fecf00;">
              <h5>RD Knowledge</h5>
            </v-list-item>
            <v-list-item href="/imprint" style="color: #44a0fc;">
              <h5>Imprint</h5>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </div>
      <div class="centered-title">
        <h2>I am looking for ...</h2>
      </div>
    </div>
    <v-row class="main-row" no-gutters>
      <v-col cols="12">
        <v-card tile href="/discovery" height="100%" class="resources low-opacity-without-hover text-center">
          <div class="vertical-center px-4">
            <h1>
              Resources
            </h1>
            <p>
              Use the EJP-RD discovery ecosystem to search connected sources like
              <span>Patient Registries, Biobanks</span> or
              <span>Knowledge Bases</span>
              for rare disease related data
            </p>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card tile href="https://www.ejprarediseases.org/fairification/" target="_blank" height="100%" class="fairification low-opacity-without-hover text-center">
          <div class="vertical-center px-4">
            <h1>
              FAIRification
            </h1>
            <p>
              Receive support on how to <span>make your data FAIR</span>
            </p>
          </div>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card tile href="https://resourcemap.ejprarediseases.org/#/" target="_blank" height="100%" class="knowledge low-opacity-without-hover text-center">
          <div class="vertical-center px-4">
            <h1>
              Knowledge
            </h1>
            <p>
              Discover more information about rare diseases using the <span>EJP-RD Mindmap</span>
            </p>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="scss">
.feedback {
  bottom: 15px;
  margin-left: 15px;
  position: absolute;
  z-index: 1;
  -webkit-box-shadow: 0px 0px 5px 0px #333;
  box-shadow: 0px 0px 5px 0px #333;
  width: 200px;
}

.centered-title {
  font-size: 30px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  padding: 10px 100px;
  color: rgb(209, 209, 209);
  background-color: #1f3863;
}

h2 {
  font-weight: 300;
}

.view-headline {
  font-size: 80px;
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 1;
  background-color: #1f3863;
}

.view-headline-list {
  font-size: 25px;
  position: absolute;
  top: 85px;
  right: 15px;
  z-index: 1;
  background-color: #1f3863;
}

.logo {
  top: 15px;
  padding: 5px;
  margin-left: 15px;
  position: absolute;
  z-index: 1;
  -webkit-box-shadow: 0px 0px 5px 0px #333;
  box-shadow: 0px 0px 5px 0px #333;
  background-color: #1f3863;
  width: 350px;
}

h1 {
  font-size: 50px;
  color: #333;
  text-align: center;
}

p {
  margin-top: 10px;
  font-size: 22px;
  color: #333;
  span {
    color: white;
  }
}

.low-opacity-without-hover {
  opacity: 90%;
  &:hover {
    opacity: 100%;
  }
}

.vertical-center {
  margin: 0;
  width: 100%;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
}

.main-row {
  height: 100%;
}

.knowledge {
  background-color: $knowledge-color;
}

.fairification {
  background-color: $fairification-color;
}

.resources {
  background-color: $resources-color;
}
</style>
