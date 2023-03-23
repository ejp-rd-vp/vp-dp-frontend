export const state = () => ({
  showCookiesNotification: true,
  showDisclaimerNotification: true
})

export const getters = {
  getCookiesNotificationStatus (state) {
    return state.showCookiesNotification
  },
  getDisclaimerNotificationStatus (state) {
    return state.showDisclaimerNotification
  }
}

export const mutations = {
  hideCookiesNotification (state) {
    state.showCookiesNotification = false
  },
  hideDisclaimerNotification (state) {
    state.showDisclaimerNotification = false
  }
}
