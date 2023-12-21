<template>
  <div class="container">
    <Loading v-if="loading"></Loading>
    <div class="form-container">
      <form @submit.prevent="savePurchaseData">
        <div v-if="!loading">
          <div class="cripto-option">
            <label for="cripto">Criptomoneda:</label>
            <select class="input" id="cripto" v-model="selectedCripto" required>
              <option value="btc">BTC</option>
              <option value="eth">ETH</option>
              <option value="usdc">USDC</option>
              <option value="usdt">USDT</option>
            </select>
          </div>
          <div class="cripto-amount">
            <label for="criptoAmount">Monto a comprar(en {{ selectedCripto }}):</label>
            <input class="input" type="text" id="criptoAmount" v-model="amount" @input="validateInput(); calculateAmount()" required>
          </div>
          <div class="ars-money">
            <label>ARS:</label>
            {{ formatNumber(money) }}
          </div>
          <div class="btn-save">
            <button type="submit" class="btn btn-outline-light" v-bind:disabled="!money || (decimalPart === false)"
              data-bs-toggle="modal" data-bs-target="#confirmPurchase">Confirmar compra</button>

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
                    <button class="btn btn-danger" @click="newTransactionLocal(this.purchaseData)"
                      data-bs-dismiss="modal">Confirmar</button>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <p v-if="!decimalPart">Número invalido, recuerda que no puede ser nulo ni tener más de 6 decimales.</p>
        </div>
      </form>
    </div>
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
      decimalPart: true,
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
      if (this.amount < 0) {
        this.amount = 0;
      }
      this.money = parseFloat((this.amount * selectedCriptoPrice).toFixed(2));
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

    async newTransactionLocal(purchaseData) {
      try {
        this.loading = true;
        await this.newTransaction(purchaseData);
        this.money = 0;
        this.amount = 0;
      } catch (error) {
        console.error('Error al realizar la nueva transacción:', error);
      } finally {
        this.loading = false;
      }
    },

    formatNumber(number) {
      const numStr = number.toString();
      const parts = numStr.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      return parts.join(',');
    },

    validateInput() {
      const regex = /^\d+(\.\d{0,6})?$/;
      if (!regex.test(this.amount)) {
        this.decimalPart = false;
      } else {
        this.decimalPart = true;
      }
    },

  },
  watch: {
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