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
          <input class="input" type="number" id="money" v-model="money" min="0" step="0.01" @input="calculateAmount"
            required>
        </div>
        <div class="cripto-amount">
          <label>Cantidad de {{ selectedCripto }} a comprar:</label>
          {{ formatNumber(amount) }}
        </div>
        <div class="btn-save">
          <button type="submit" class="btn btn-outline-light" v-bind:disabled="!money" data-bs-toggle="modal"
            data-bs-target="#confirmPurchase">Confirmar compra</button>

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
                  <button class="btn btn-danger" @click="newTransaction(this.purchaseData)"
                    data-bs-dismiss="modal">Confirmar</button>
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
      purchaseData: null,
    }
  },
  computed: {
    ...mapGetters('criptos', ['getBTCPrice', 'getETHPrice', 'getUSDCPrice', 'getUSDTPrice']),
    ...mapGetters(['username']),
  },
  methods: {
    ...mapActions('criptos', ['fetchCryptosPrices']),
    ...mapActions('transactions', ['newTransaction', 'getHistory']),

    calculateAmount() {
      const selectedCriptoPrice = this.getSelectedPrice(this.selectedCripto);

      if (this.money < 0) {
        this.money = 0;
      }

      this.amount = parseFloat((parseFloat(this.money) / parseFloat(selectedCriptoPrice)).toFixed(6));
    },

    getSelectedPrice(selectedCripto) {
      const getterName = `get${selectedCripto.toUpperCase()}Price`;
      return this[getterName].totalBid;
    },

    savePurchaseData() {
      if (this.money > 0 && this.amount > 0) {
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

    newTransaction(purchaseData) {
      this.$store.dispatch('transactions/newTransaction', purchaseData)
        .then((response) => {
          console.log('Compra registrada con éxito', response);
          this.money = 0;
          this.amount = 0;
        })
        .catch((error) => {
          console.error('Error al crear la compra:', error);
        });
    },

    formatNumber(number) {
      const numStr = number.toString();
      const parts = numStr.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return parts.join(',');
    }

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
#money {
  max-width: 100px;
}

h5,
h6 {
  color: black;
}
</style>