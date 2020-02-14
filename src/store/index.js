import Vue from 'vue'
import Vuex from 'vuex'
import { LOGIN, LOGOUT, TITLE } from './types'
import tabbar from './modules/tabbar'
import account from './modules/account'
import otc from './modules/otc'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    tabbar,
    account,
    otc
  },
  state: {
    user: {},
    token: null,
    title: ''
  },
  mutations: {
    [LOGIN]: (state, data) => {
      localStorage.token = data
      state.token = data
    },
    [LOGOUT]: (state) => {
      localStorage.removeItem('token')
      state.token = null
    },
    [TITLE]: (state, data) => {
      state.title = data
    }
  },
  actions: {

  }
})
