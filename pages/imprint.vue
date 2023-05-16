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
    <h1>
      Imprint
    </h1>
    <img src="@/assets/images/others/eu-emblem.jpg" width="300px" />
    <p>
      This work is supported by the funding from the European Union’s Horizon 2020 research and innovation programme under the EJP RD COFUND-EJP N° 825575.
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
