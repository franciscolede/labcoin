import axios from 'axios'

const apiClient = axios.create({
	baseURL: 'https://laboratorio3-f36a.restdb.io/rest/transactions',
	headers: {'x-apikey': '60eb09146661365596af552f'}
});


const state = {
};

const getters = {
};

const mutations = {
};

const actions = {
  async newPurchase(_, purchaseData) {
    try {
      const response = await apiClient.post('', purchaseData);

      return response.data;
    } catch (error) {
      console.error('Error al crear la transacción:', error);
    }
  },

  async newSale(_, saleData) {
    try {
      const response = await apiClient.post('', saleData);

      return response.data;
    } catch (error) {
      console.error('Error al crear la transacción:', error);
    }
  },

  async getHistory(_, username) {
    try {
      const response = await apiClient.get(`https://laboratorio3-f36a.restdb.io/rest/transactions?q={"user_id":"${username}"}`);
      return response.data;
    } catch (error) {
      console.error('Error al devolver el historial:', error);
    }
  },

  async deleteTransaction(_, transactionId) {
    try {
      await apiClient.delete(`https://laboratorio3-f36a.restdb.io/rest/transactions/${transactionId}`);
      location.reload();
    } catch (error) {
      console.error('Error al eliminar la transacción:', error);
    }
  },

  async getState(_, username) {
    try {
      const userCriptos = {
        BTC: 0,
        ETH: 0,
        USDC: 0,
        USDT: 0,
      };
  
      const response = await apiClient.get(`https://laboratorio3-f36a.restdb.io/rest/transactions?q={"user_id":"${username}"}`);
      
      for (const transaction of response.data) {
          if (transaction.crypto_code === 'btc') {
            userCriptos.BTC += parseFloat(transaction.crypto_amount);
          } else if (transaction.crypto_code === 'eth') {
            userCriptos.ETH += parseFloat(transaction.crypto_amount);
          } else if (transaction.crypto_code === 'usdc') {
            userCriptos.USDC += parseFloat(transaction.crypto_amount);
          } else if (transaction.crypto_code === 'usdt') {
            userCriptos.USDT += parseFloat(transaction.crypto_amount);
          }
      }
  
      return userCriptos;
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
}
