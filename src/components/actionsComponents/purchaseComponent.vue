<template>
    <div class="container">
        <div class="form-container">
            <form @submit.prevent="newPurchase">
                <div class="cripto-option">
                    <label for="cripto">Criptomoneda:</label>
                    <select class="input" id="cripto" v-model="selectedCripto" required>
                        <option value="btc">BTC</option>
                        <option value="eth">ETH</option>
                        <option value="usdc">USDC</option>
                        <option value="usdt">USDT</option>
                    </select>
                </div>
                <div class="ars-money">
                    <label for="money">Monto a pagar(en ARS):</label>
                    <input class="input" type="number" id="money" v-model="money" step="1" @input="calculateAmount" required>
                </div>
                <div class="cripto-amount">
                    <label>Cantidad de {{ selectedCripto }} a comprar:</label>
                    {{ amount }}
                </div>
                <div class="btn-save">
                    <button id="btn-save" type="submit">Guardar Compra</button>
                </div> 
            </form>
        </div>
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
    },
  },
  created() {
    this.fetchCryptosPrices();
  },
};
</script>

<style scoped>

#money{
    max-width: 100px;
}

</style>