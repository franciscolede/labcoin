<template>
  <div class="container">
    <table class="table">
      <thead>
        <tr>
          <th scope="col">Criptomoneda</th>
          <th scope="col">Cantidad</th>
          <th scope="col">Dinero</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(amount, cryptoCode) in getWallet" :key="cryptoCode">
          <td>{{ cryptoCode.toUpperCase() }}</td>
          <td>{{ formatNumber(amount.toFixed(6)) }}</td>
          <td>{{ formatNumber((amount * prices[cryptoCode]).toFixed(2)) }}</td>
        </tr>
        <tr>
          <td><b>TOTAL</b></td>
          <td></td>
          <td>{{ formatNumber(total.toFixed(2)) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      prices: {
        btc: 0,
        eth: 0,
        usdc: 0,
        usdt: 0,
      },
      total: 0,
    };
  },

  created() {
    this.getState(this.username);
    this.fetchPrices();
    this.calculateTotal();
  },

  computed: {
    ...mapGetters(['username']),
    ...mapGetters('criptos', ['getBTCPrice', 'getETHPrice', 'getUSDCPrice', 'getUSDTPrice']),
    ...mapGetters('transactions', [
      'getWallet',
    ]),
  },

  methods: {
    ...mapActions('transactions', ['getState']),

    fetchPrices() {
      this.prices.btc = this.getBTCPrice.totalAsk;
      this.prices.eth = this.getETHPrice.totalAsk;
      this.prices.usdc = this.getUSDCPrice.totalAsk;
      this.prices.usdt = this.getUSDTPrice.totalAsk;
    },

    calculateTotal() {
      for (let crypto in this.getWallet) {
        const amount = this.getWallet[crypto];
        this.total += amount * this.prices[crypto];
      }
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

<style scoped>
.container {
  width: 50%;
}
</style>
