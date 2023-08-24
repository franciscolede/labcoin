import axios from 'axios'

const state = {
  bitcoinPrice: null
}

const getters = {
  getBitcoinPrice: state => state.bitcoinPrice
}

const mutations = {
  setBitcoinPrice: (state, price) => {
    state.bitcoinPrice = price
  }
}

const actions = {
  fetchBitcoinPrice: async ({ commit }) => {
    try {
      const response = await axios.get('https://criptoya.com/api/btc/ars/1')
      const bitcoinPrice = response.data
      commit('setBitcoinPrice', bitcoinPrice)
    } catch (error) {
      console.log('Error fetching Bitcoin price:', error)
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
