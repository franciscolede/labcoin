import axios from 'axios';

const API_BASE_URL = 'https://laboratorio-afe2.restdb.io/rest/transactions';
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {'x-apikey': '650b53356888544ec60c00bf'},
});

const state = {
  wallet: {},
};

const getters = {
  getWallet: (state) => state.wallet,
};

const mutations = {
  updateWalletAmount(state, { cryptoCode, amount, action }) {
    if (!state.wallet[cryptoCode]) {
      state.wallet[cryptoCode] = 0;
    }

    state.wallet[cryptoCode] += (action === 'purchase') ? amount : -amount;

    if (state.wallet[cryptoCode] < 0) {
      state.wallet[cryptoCode] = 0;
    }
  },

  setWallet(state, newWallet) {
    state.wallet = { ...newWallet };
  }
};

const actions = {
  async newTransaction({ commit}, transactionData) {
    try {
      console.log('Transaction Data:', transactionData);
      const response = await apiClient.post('', transactionData);

      commit('updateWalletAmount', {
        cryptoCode: transactionData.crypto_code,
        amount: transactionData.crypto_amount,
        action: transactionData.action,
      });

      return response.data;
    } catch (error) {
      console.error('Error al crear la transacción:', error);
      if (error.response) {
        console.log('Respuesta del servidor:', error.response.data);
      }
    }
  },

  async getHistory(_, username) {
    try {
      const response = await apiClient.get(`${API_BASE_URL}?q={"user_id":"${username}"}`);
      return response.data;
    } catch (error) {
      console.error('Error al devolver el historial:', error);
    }
  },

  async deleteTransaction({ commit}, transactionId) {
    try {
      const response = await apiClient.delete(`${API_BASE_URL}/${transactionId}`);
      const { crypto_code, crypto_amount, action } = response.data;
      commit('updateWalletAmount', {
        cryptoCode: crypto_code,
        amount: crypto_amount,
        action: (action === 'purchase' ? 'sale' : 'purchase'),
      });
    } catch (error) {
      console.error('Error al eliminar la transacción:', error);
    }
  },

  async editTransaction({ commit}, { transactionId, newValues }) {
    try {
      const response = await apiClient.patch(`${API_BASE_URL}/${transactionId}`, newValues);
      const { crypto_code, crypto_amount, money, action } = response.data;

      const newAmount = action === 'purchase' ? -crypto_amount : crypto_amount;
      const newMoney = action === 'purchase' ? -money : money;

      commit('updateWalletAmount', {
        cryptoCode: crypto_code,
        amount: newAmount,
        money: newMoney,
        action,
      });
    } catch (error) {
      console.error('Error al editar la transacción:', error);
    }
  },

  async getState({ commit }, username) {
    try {
      const response = await apiClient.get(`${API_BASE_URL}?q={"user_id":"${username}"}`);
      const userCriptos = {};
  
      for (const transaction of response.data) {
        if (transaction.crypto_code && transaction.action) {
          const cryptoCode = transaction.crypto_code.toLowerCase();
  
          if (!userCriptos[cryptoCode]) {
            userCriptos[cryptoCode] = 0;
          }
          userCriptos[cryptoCode] += transaction.action === 'purchase' ? parseFloat(transaction.crypto_amount) : -parseFloat(transaction.crypto_amount);
          if (userCriptos[cryptoCode] === 0) {
            delete userCriptos[cryptoCode];
          }
        }
      }
  
      commit('setWallet', userCriptos);
    } catch (error) {
      console.error('Error al devolver el estado de la cuenta:', error);
    }
  },
  
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
