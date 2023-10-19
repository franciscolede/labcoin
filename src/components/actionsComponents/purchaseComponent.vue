<template>
    <div class="container">
        <div class="form-container">
            <form @submit.prevent="savePurchaseData">
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
                    <button type="submit" class="btn btn-outline-light" v-bind:disabled="!money" data-bs-toggle="modal" data-bs-target="#confirmPurchase">Confirmar compra</button>
            
                    <div class="modal" id="confirmPurchase">
                      <div class="modal-dialog">
                        <div class="modal-content">

                          <div class="modal-header">
                            <h5 class="modal-title">Confirmar compra</h5>
                            <button class="btn-close" data-bs-dismiss="modal"></button>
                          </div>

                          <div class="modal-body">
                            <h6>Confirme que está seguro de realizar la compra.</h6>
                          </div>

                          <div class="modal-footer">
                            <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button class="btn btn-danger" @click="newPurchase(this.purchaseData)" data-bs-dismiss="modal">Confirmar</button>
                          </div>

                        </div>
                      </div>
                    </div>
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
      purchaseData : null,
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
      return this.getBitcoinPrice.totalAsk;
    },
    ethereumPrice() {
      return this.getEthereumPrice.totalAsk;
    },
    usdcPrice() {
      return this.getUsdcPrice.totalAsk;
    },
    usdtPrice() {
      return this.getUsdtPrice.totalAsk;
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


      this.amount = (parseFloat(this.money) / parseFloat(selectedCriptoPrice)).toFixed(6);//toFixed para la cantidad de decimales
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

    savePurchaseData(){
      if (this.money > 0 && this.amount > 0){
          this.purchaseData = {
          user_id: this.username,
          action: 'purchase',
          crypto_code: this.selectedCripto,
          crypto_amount: this.amount,
          money: this.money,
          datetime: new Date(),
        };
      }
    },

    newPurchase(purchaseData) {
        this.$store.dispatch('transactions/newPurchase', purchaseData)
          .then((response) => {
            console.log('Compra registrada con éxito', response);
            this.money = 0;
            this.amount = 0;
          })
          .catch((error) => {
            console.error('Error al crear la compra:', error);
          });
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

h5, h6{
  color: black;
}

</style>