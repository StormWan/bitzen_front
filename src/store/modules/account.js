
const state = {
  phone: '',
  areaCode: '',
  key: ''
}

// mutations
const mutations = {
  auth (state, params) {
    state.areaCode = params.areaCode
    state.phone = params.phone
    state.key = params.key
  }
}
const getters = {}
const actions = {}

export default {
  namespaced: true,
  getters,
  actions,
  state,
  mutations
}
