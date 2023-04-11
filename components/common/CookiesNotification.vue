<template>
  <v-card class="cookies-notification-card text-center" width="100%" color="#1f3863" tile>
    <p class="white-text">
      We only use technically necessary cookies to ensure this service operates properly and provides the best user experience for you. If you continue to use this website we assume that you are fine with that.
    </p>
    <v-btn class="my-3 ml-1" color="rgb(68, 160, 252)" @click="$cookies.set('showCookiesNotification', false); $router.go(0)" small tile>
      Accept
    </v-btn>
  </v-card>
</template>

<style scoped>
.cookies-notification-card {
  position: absolute;
  bottom: 0;
  z-index: 2;
  -webkit-box-shadow: 0px 0px 5px 0px #333;
  box-shadow: 0px 0px 5px 0px #333;
}
p {
  font-size: 15px;
  color: white;
  display: inline;
}
</style>
