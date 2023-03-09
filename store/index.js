export const state = () => ({
  showCookiesNotification: true
})

export const getters = {
  getCookiesNotificationStatus (state) {
    return state.showCookiesNotification
  }
}

export const mutations = {
  hideCookiesNotification (state) {
    state.showCookiesNotification = false
  }
}
