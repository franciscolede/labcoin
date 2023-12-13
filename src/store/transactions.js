import axios from 'axios'

const apiClient = axios.create({
	baseURL: 'https://laboratorio3-5fc7.restdb.io/rest/transactions',
	headers: {'x-apikey': '64bdbc3386d8c5613ded91e7'}
});


const state = {
};

const getters = {
};

const mutations = {
};

const actions = {
  async newTransaction(_, transactionData) {
    try {
      console.log('Transaction Data:', transactionData);
      const response = await apiClient.post('', transactionData);
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
      const response = await apiClient.get(`https://laboratorio3-5fc7.restdb.io/rest/transactions?q={"user_id":"${username}"}`);
      return response.data;
    } catch (error) {
      console.error('Error al devolver el historial:', error);
    }
  },

  async deleteTransaction(_, transactionId) {
    try {
      await apiClient.delete(`https://laboratorio3-5fc7.restdb.io/rest/transactions/${transactionId}`);
      location.reload();
    } catch (error) {
      console.error('Error al eliminar la transacción:', error);
    }
  },

  async editTransaction(_, { transactionId, newValues }) {
    try {
      const response = await apiClient.patch(`https://laboratorio3-5fc7.restdb.io/rest/transactions/${transactionId}`, newValues);
      console.log('Transacción editada:', response.data);
      location.reload();
    } catch (error) {
      console.error('Error al editar la transacción:', error);
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
  
      const response = await apiClient.get(`https://laboratorio3-5fc7.restdb.io/rest/transactions?q={"user_id":"${username}"}`);
      
      for (const transaction of response.data) {
        if (transaction.crypto_code && transaction.action) {
          switch (transaction.crypto_code) {
            case 'btc':
              userCriptos.BTC += transaction.action === 'purchase' ? parseFloat(transaction.crypto_amount) : -parseFloat(transaction.crypto_amount);
              break;
            case 'eth':
              userCriptos.ETH += transaction.action === 'purchase' ? parseFloat(transaction.crypto_amount) : -parseFloat(transaction.crypto_amount);
              break;
            case 'usdc':
              userCriptos.USDC += transaction.action === 'purchase' ? parseFloat(transaction.crypto_amount) : -parseFloat(transaction.crypto_amount);
              break;
            case 'usdt':
              userCriptos.USDT += transaction.action === 'purchase' ? parseFloat(transaction.crypto_amount) : -parseFloat(transaction.crypto_amount);
              break;
            default:
              break;
          }
        } else {
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
