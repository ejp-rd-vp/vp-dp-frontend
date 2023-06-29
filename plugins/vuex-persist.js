import VuexPersistence from 'vuex-persist'

export default ({ store }) => {

  // User configs state
  new VuexPersistence({
    key: 'vuex-user-configs',

    storage: window.localStorage,

    reducer: (state) => ({
      user_configs: {
        cookiesAccepted: state.user_configs.cookiesAccepted,
      },
    }),
  }).plugin(store)
}
