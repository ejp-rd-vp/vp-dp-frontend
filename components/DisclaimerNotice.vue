<template>
  <v-row justify="center" align="center">
    <div class="disclaimerNotice">
      <p class="px-2">
        We are continuously working on improvements of the portal and love to hear
        <a href="https://forms.office.com/r/UrgvkD39t8" target="_blank">your feedback and suggestions</a>.
      </p>
    </div>
  </v-row>
</template>

<style scoped lang="scss">
.disclaimerNotice {
  position: relative;
  background: rgb(254, 239, 179);
  color: rgb(51, 51, 51);
  border: 1px solid rgb(254, 207, 0);
  padding: 10px 10px 0px;
  text-align: left;
  font-size: 14px;
  line-height: 20px;
  font-family: Helvetica neue, Helvetica, sans-serif;
  max-width: 80vw;
  margin-top: -35px;
  @media screen and (max-width: 950px) {
    margin-top: 10px;
  }
}

.accept-button {
  color: rgb(255, 255, 255);
  position: relative;
  float: right;
  padding: 3px 10px;
  bottom: 20px;
  margin: 0px 10px 0px 0px;
}
</style>
