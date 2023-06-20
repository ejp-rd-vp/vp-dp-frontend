<template>
  <div class="main-container" fluid fill-height>
    <v-btn class="ml-4 mb-8" href="/" color="#44a0fc" icon id="no-background-hover">
      <v-icon size="40">
        mdi-arrow-left
      </v-icon>
      <v-icon class="ml-6" size="40">
        mdi-home-outline
      </v-icon>
    </v-btn>
    <h1 style="margin-bottom: 100px;">
      Legal Notice
    </h1>
    <v-card-title class="ml-2">
      Where we are
    </v-card-title>
    <p class="ml-6 mt-6">
      INSERM IDF Centre Est: Bâtiment A, site Biopark <br>
      8, rue de la Croix-Jarry <br>
      75013 Paris
    </p>
    <img class="ml-6 mt-6" src="@/assets/images/others/eu-emblem.jpg" width="300px" />
    <img class="ml-6 mt-6" src="@/assets/images/logo/INSERM.png" width="300px" />
    <p class="ml-6 mt-6" style="max-width: 600px">
      The EJP RD initiative has received funding from the European Union’s Horizon 2020 research and innovation programme under grant agreement N°825575
    </p>
  </div>
</template>

<style scoped>
#no-background-hover::before {
  background-color: transparent !important;
}

.main-container {
  padding: 40px 80px;
  margin: 0;
  width: 100%;
  min-height: 100%;
  background-color: white;
  color: black;
}
p {
  font-size: 20px;
  max-width: 80vw;
}
</style>
