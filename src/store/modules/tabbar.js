
const state = {
  activeTab: 1,
  bbName: '币币'
}

// mutations
const mutations = {
  setActiveTab (state, index) {
    state.activeTab = index
  },
  setBBTab (state, bbName) {
    state.bbName = bbName
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
