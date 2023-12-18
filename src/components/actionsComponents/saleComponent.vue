<template>
    <div class="container">
        <Wallet />
        <div class="form-container">
            <hr>
            <form @submit.prevent="saveSaleData">
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
                    <label for="criptoAmount">Monto a vender(en {{ selectedCripto }}):</label>
                    <input class="input" type="number" id="criptoAmount" v-model="amount" min="0" step="0.000001"
                        @input="calculateAmount" required>
                </div>
                <div class="ars-money">
                    <label>ARS:</label>
                    {{ formatNumber(money) }}
                </div>
                <div class="btn-save">
                    <button type="submit" class="btn btn-outline-light"
                        :disabled="amount === 0 || userAmountSelected < amount" data-bs-toggle="modal"
                        data-bs-target="#confirmSale">
                        Confirmar venta
                    </button>
                    <div class="modal" id="confirmSale">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Confirmar venta</h5>
                                    <button class="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div class="modal-body">
                                    <h6>Confirme que está seguro de realizar la venta.</h6>
                                </div>
                                <div class="modal-footer">
                                    <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                                    <button class="btn btn-danger" @click="newTransactionLocal(saleData)"
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
import Wallet from '../wallet.vue';

export default {
    components: {
        Wallet,
    },

    data() {
        return {
            selectedCripto: 'btc',
            selectedCriptoPrice: 0,

            money: 0,
            amount: 0,

            saleData: null,

            userWallet: {},

            userAmountSelected: 0,
        }
    },
    computed: {
        ...mapGetters(['username']),
        ...mapGetters('transactions', ['getWallet']),
        ...mapGetters('criptos', [
            'getBitcoinPrice',
            'getEthereumPrice',
            'getUsdcPrice',
            'getUsdtPrice',
        ]),
    },
    methods: {
        ...mapActions('transactions', ['newTransaction', 'getState']),
        ...mapActions('criptos', ['fetchCryptosPrices']),


        calculateAmount() {
            const selectedCriptoPrice = this.getSelectedPrice(this.selectedCripto);
            if (this.amount < 0) {
                this.amount = 0;
            }
            this.getUserAmount(this.selectedCripto);
            this.money = parseFloat((this.amount * selectedCriptoPrice).toFixed(6));
        },


        getSelectedPrice(selectedCripto) {
            switch (selectedCripto) {
                case 'btc':
                    return this.getBitcoinPrice.totalAsk;
                case 'eth':
                    return this.getEthereumPrice.totalAsk;
                case 'usdc':
                    return this.getUsdcPrice.totalAsk;
                case 'usdt':
                    return this.getUsdtPrice.totalAsk;
                default:
                    return 0;
            }
        },

        saveSaleData() {
            if (this.amount > 0) {
                if (this.userAmountSelected >= this.amount) {
                    this.money = this.money.toFixed(2);
                    console.log("money:" + this.money)
                    this.saleData = {
                        user_id: this.username,
                        action: 'sale',
                        crypto_code: this.selectedCripto,
                        crypto_amount: this.amount,
                        money: this.money,
                        datetime: new Date(),
                    };
                } else {
                    alert('Cripto insuficiente en la billetera.');
                }
            }
        },

        newTransactionLocal(saleData) {
            this.newTransaction(saleData);
            this.money = 0;
            this.amount = 0;
            // location.reload();
        },

        getUserAmount(selectedCripto) {
            if (!this.getWallet) {
                this.getState();
            }

            const wallet = this.getWallet || {};
            const cryptoCode = selectedCripto.toLowerCase();
            this.userAmountSelected = wallet[cryptoCode] || 0;
        },

        formatNumber(number) {
            const numStr = number.toString();
            const parts = numStr.split('.');
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            return parts.join(',');
        }


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
  