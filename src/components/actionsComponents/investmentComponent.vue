<template>
  <div class="container mt-5">
    <Loading v-if="loading"></Loading>
    <table v-if="!loading" class="table">
      <thead>
        <tr>
          <th scope="col">Criptomoneda</th>
          <th scope="col">Resultado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cryptoInfo in transactionsInvestment" :key="cryptoInfo.cryptoCode">
          <td>{{ cryptoInfo.crypto_code.toUpperCase() }}</td>
          <td :class="{ 'table-success': cryptoInfo.amount > 0, 'table-danger': cryptoInfo.amount < 0 }">
            {{ cryptoInfo.amount >= 0 ? '+' : '' }}{{ formatNumber(Number(cryptoInfo.amount).toFixed(2)) }}
          </td>
        </tr>
        <tr>
          <td><b>TOTAL</b></td>
          <td :class="{ 'table-success': total > 0, 'table-danger': total < 0 }">
            <b>{{ total >= 0 ? '+' : '' }}{{ formatNumber(total.toFixed(2)) }}</b>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
<script>
import { mapGetters, mapActions } from 'vuex';
import Loading from '../loading.vue';

export default {
  components: {
    Loading,
  },
  data() {
    return {
      loading: false,
      transactions: [],
      transactionsInvestment: [],
      total: 0,
    };
  },


  computed: {
    ...mapGetters(['username']),
  },

  async created() {
    try {
      this.loading = true;
      this.transactions = await this.getHistory(this.username);
      this.getInvestment(this.transactions);
    } catch (error) {
      console.error('Error al obtener el historial:', error);
    } finally {
      this.loading = false;
    }
  },

  methods: {
    ...mapActions('transactions', ['getHistory']),

    getInvestment(transactions) {
      this.transactionsInvestment = transactions.reduce((result, transaction) => {
        if (transaction.crypto_code && transaction.action) {
          const cryptoCode = transaction.crypto_code.toLowerCase();
          const index = result.findIndex((el) => el.crypto_code === cryptoCode);

          if (index === -1) {
            result.push({
              crypto_code: cryptoCode,
              amount: transaction.action === 'purchase' ? -Number(transaction.money) : Number(transaction.money),
            });
          } else {
            result[index].amount += transaction.action === 'purchase' ? -Number(transaction.money) : Number(transaction.money);
          }
        }
        return result;
      }, []);

      let total = 0;

      for (const transaction of this.transactionsInvestment) {
        total += Number(transaction.amount);
      }

      this.total = total;
    },

    formatNumber(number) {
      const numStr = number.toString();
      const parts = numStr.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return parts.join(',');
    }
  },
};
</script>
  
<style scoped></style>
  