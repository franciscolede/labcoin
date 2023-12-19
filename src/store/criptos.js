import axios from 'axios'

const state = {
  criptos: {
    btc: null,
    eth: null,
    usdc: null,
    usdt: null
  }
};

const getters = {
};

const mutations = {
  setCripto(state, { criptoCode, data }) {
    state.criptos[criptoCode] = data;
  }
};

const actions = {
  async fetchCryptosPrices({ commit, state }) {
    try {
      for (const criptoCode in state.criptos) {
        const criptoResponse = await axios.get(`https://criptoya.com/api/astropay/${criptoCode}/ars/1`);
        commit('setCripto', { criptoCode, data: criptoResponse.data });
      }
    } catch (error) {
      console.log('Error fetching cryptocurrency prices:', error);
    }
  }
};

Object.keys(state.criptos).forEach((criptoCode) => {
  getters[`get${criptoCode.toUpperCase()}Price`] = (state) => state.criptos[criptoCode];
});

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
