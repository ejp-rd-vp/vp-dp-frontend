export const state = () => ({
  selectedObject: null,
})

export const mutations = {
  setSelectedObject(state, selectedObject) {
    state.selectedObject = selectedObject
  },
}

export const getters = {
  getSelectedObject: (state) => {
    return state.selectedObject
  },
}
