export const state = () => ({
  cookiesAccepted: false,
})

export const mutations = {
  setCookiesAccepted(state) {
    state.cookiesAccepted = true
  }
}

export const getters = {
  areCookiesAccepted: (state) => {
    return state.cookiesAccepted
  },
}
