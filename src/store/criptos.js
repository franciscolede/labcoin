import axios from 'axios'

const state = {
  bitcoinPrice: null,
  ethereumPrice: null,
  usdcPrice: null,
  usdtPrice: null,
};

const getters = {
  getBitcoinPrice: (state) => state.bitcoinPrice,
  getEthereumPrice: (state) => state.ethereumPrice,
  getUsdcPrice: (state) => state.usdcPrice,
  getUsdtPrice: (state) => state.usdtPrice,
};

const mutations = {
  setBitcoinPrice: (state, price) => {
    state.bitcoinPrice = price;
  },
  setEthereumPrice: (state, price) => {
    state.ethereumPrice = price;
  },
  setUsdcPrice: (state, price) => {
    state.usdcPrice = price;
  },
  setUsdtPrice: (state, price) => {
    state.usdtPrice = price;
  },
};

const actions = {
  fetchCryptosPrices: async ({ commit }) => {
    try {
      const bitcoinResponse = await axios.get('https://criptoya.com/api/astropay/btc/ars/1');
      const ethereumResponse = await axios.get('https://criptoya.com/api/astropay/eth/ars/1');
      const usdcResponse = await axios.get('https://criptoya.com/api/astropay/usdc/ars/1');
      const usdtResponse = await axios.get('https://criptoya.com/api/astropay/usdt/ars/1');
      
      commit('setBitcoinPrice', bitcoinResponse.data);
      commit('setEthereumPrice', ethereumResponse.data);
      commit('setUsdcPrice', usdcResponse.data);
      commit('setUsdtPrice', usdtResponse.data);
    } catch (error) {
      console.log('Error fetching cryptocurrency price:', error)
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
