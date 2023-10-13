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
                    <input class="input" type="number" id="money" v-model="money" min="0" step="1" @input="calculateAmount" required>
                </div>
                <div class="cripto-amount">
                    <label>Cantidad de {{ selectedCripto }} a comprar:</label>
                    {{ amount }}
                </div>
                <div class="btn-save">
                    <button class="btn btn-outline-light" id="btn-save" type="submit">Guardar Compra</button>
                </div> 
            </form>
            <p>{{ msjPurchase }}</p>
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
      msjPurchase: "",
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
    ...mapActions('transactions', ['newPurchase','getHistory']),

    calculateAmount() {
      const selectedCriptoPrice = this.getSelectedPrice(this.selectedCripto);


      if (this.money < 0) {
        this.money = 0;
      }


      this.amount = (parseFloat(this.money) / parseFloat(selectedCriptoPrice)).toFixed(13);//toFixed para la cantidad de decimales
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
      if (this.money > 0 && this.amount > 0){
          this.msjPurchase = "";
          const purchaseData = {
          user_id: this.username,
          action: 'purchase',
          crypto_code: this.selectedCripto,
          crypto_amount: this.amount,
          money: this.money,
          datetime: new Date(),
        };

        this.$store.dispatch('transactions/newPurchase', purchaseData)
          .then((response) => {
            this.msjPurchase = "Compra realizada con éxito!";
            console.log('Compra registrada con éxito', response);
            this.money = 0;
            this.amount = 0;
          })
          .catch((error) => {
            this.msjPurchase = "Hubo un error al realizar la compra, intentelo nuevamente."
            console.error('Error al crear la compra:', error);
          });
      } else {
        this.msjPurchase = "Ingrese un monto a pagar mayor a 0 para realizar la compra.";
      }

      console.log(this.getHistory(this.username))
    },

  },
  watch: { //Al cambiar de moneda en el select, reestablecer el valor de money y amount a 0 para evitar confusiones
    selectedCripto() {
      this.money = 0;
      this.amount = 0;
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