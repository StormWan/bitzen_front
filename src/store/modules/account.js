
const state = {
  phone: '',
  areaCode: '',
  key: '',
  is_setup_pin: ''
}

// mutations
const mutations = {
  auth (state, params) {
    state.areaCode = params.areaCode
    state.phone = params.phone
    state.key = params.key
  },
  isPassword (state, params) {
    state.is_setup_pin = params.is_setup_pin
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
