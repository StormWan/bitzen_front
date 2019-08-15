
const state = {
  otc_pair: '',
  side: '', // side: (buy, currency_amount), (sell, asset_amount)
  currency_amount: '',
  asset_amount: '',
  price: '',
  payment_method: ''
}

// mutations
const mutations = {
  setBuyOrder (state, params) {
    state.otc_pair = params.otc_pair
    state.side = 'buy'
    state.currency_amount = params.currency_amount
    state.price = params.price
    state.payment_method = params.payment_method
  },
  setSellOrder (state, params) {
    state.otc_pair = params.otc_pair
    state.side = 'sell'
    state.asset_amount = params.asset_amount
    state.price = params.price
    state.payment_method = params.payment_method
  },
  clearOrder () {
    state.otc_pair = ''
    state.side = ''
    state.currency_amount = ''
    state.asset_amount = ''
    state.price = ''
    state.payment_method = ''
  }
}
const getters = {
  getBuyOtcOrder (state) {
    return {
      otc_pair: state.otc_pair,
      side: state.side,
      currency_amount: state.currency_amount,
      price: state.price,
      payment_method: state.payment_method
    }
  },
  getSellOtcOrder (state) {
    return {
      otc_pair: state.otc_pair,
      side: state.side,
      asset_amount: state.asset_amount,
      price: state.price,
      payment_method: state.payment_method
    }
  }
}
const actions = {}

export default {
  namespaced: true,
  getters,
  actions,
  state,
  mutations
}
