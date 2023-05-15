<template>
  <v-row justify="center" align="center">
    <div class="disclaimerNotice">
      <h4>Disclaimer</h4>
      <p>
        Please note that this is a <b>Beta Version</b> of the EJP-RD Resource Discovery Portal. The functionalities on this website are still limited and partially under development.  Furthermore, currently no information on the use and access conditions of the individual resources are being transmitted.
      </p>
      <p>
        Help us improve by <a href="https://forms.office.com/r/UrgvkD39t8" target="_blank">sending us feedback</a>.
      </p>
      <v-btn class="accept-button" @click="$cookies.set('showDisclaimerNotification', false); $router.go(0)" color="rgb(68, 160, 252)">
        Accept
      </v-btn>
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
  max-width: 60vw;
  margin-top: -35px;
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
