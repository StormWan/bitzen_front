
const state = {
  activeTab: 1
}

// mutations
const mutations = {
  setActiveTab (state, index) {
    state.activeTab = index
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
