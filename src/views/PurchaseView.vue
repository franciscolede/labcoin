<template>
  <div class="purchase-page">
    <h1>Vista compra</h1>
    <form @submit.prevent="newPurchase">
      <label for="cripto">Criptomoneda:</label>
      <select id="cripto" v-model="selectedCripto" required>
        <option value="btc">BTC</option>
        <option value="eth">ETH</option>
        <option value="usdc">USDC</option>
        <option value="usdt">USDT</option>
      </select>

      <label for="money">Monto a pagar(en ARS):</label>
      <input type="number" id="money" v-model="money" step="1" @input="calculateAmount" required>

      <p>Cripto:</p>
      <p>{{ amount }}</p>

      <button type="submit">Guardar Compra</button>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      selectedCripto: 'btc',
      money: 0,
      amount: 0,
    }
  },
  computed: {
    ...mapGetters('criptos', [
      'getBitcoinPrice',
      'getEthereumPrice',
      'getUsdcPrice',
      'getUsdtPrice',
    ]),
    bitcoinPrice() {
      return this.getBitcoinPrice.ask;
    },
    ethereumPrice() {
      return this.getEthereumPrice.ask;
    },
    usdcPrice() {
      return this.getUsdcPrice.ask;
    },
    usdtPrice() {
      return this.getUsdtPrice.ask;
    },
    ...mapGetters([
      'username'
    ]),
  },
  methods: {
    ...mapActions('criptos', ['fetchCryptosPrices']),

    calculateAmount() {
      const selectedCriptoPrice = this.getSelectedPrice(this.selectedCripto);
      this.amount = (parseFloat(this.money) / parseFloat(selectedCriptoPrice));
    },

    getSelectedPrice(selectedCripto) {
      if (selectedCripto === "btc") {
        return this.getBitcoinPrice.ask;
      } else if (selectedCripto === "eth") {
        return this.getEthereumPrice.ask;
      } else if (selectedCripto === "usdc") {
        return this.getUsdcPrice.ask;
      } else if (selectedCripto === "usdt") {
        return this.getUsdtPrice.ask;
      }
    },

    newPurchase() {
      // Aquí puedes implementar la lógica para guardar la compra
    },
  },
  created() {
    this.fetchCryptosPrices();
  },
};
</script>

<style scoped>
.purchase-page {
  padding: 10px;
}
</style>