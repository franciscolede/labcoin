<template>
    <div class="container">
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
                    {{ money }}
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
                                    <button class="btn btn-danger" @click="newTransaction(this.saleData)"
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
            saleData: null,

            userBTC: 0,
            userETH: 0,
            userUSDC: 0,
            userUSDT: 0,
            userAmountSelected: 0,
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
        ...mapActions('transactions', ['newTransaction', 'getHistory', 'getState']),

        calculateAmount() {
            const selectedCriptoPrice = this.getSelectedPrice(this.selectedCripto);

            if (this.amount < 0) {
                this.amount = 0;
            }

            this.money = parseFloat((this.amount * selectedCriptoPrice).toFixed(6));
        },

        getSelectedPrice(selectedCripto) {
            if (selectedCripto === "btc") {
                this.userAmountSelected = this.userBTC;
                return this.getBitcoinPrice.totalAsk;
            } else if (selectedCripto === "eth") {
                this.userAmountSelected = this.userETH;
                return this.getEthereumPrice.totalAsk;
            } else if (selectedCripto === "usdc") {
                this.userAmountSelected = this.userUSDC;
                return this.getUsdcPrice.totalAsk;
            } else if (selectedCripto === "usdt") {
                this.userAmountSelected = this.userUSDT;
                return this.getUsdtPrice.totalAsk;
            }
        },

        saveSaleData() {
            if (this.amount > 0) {
                if (this.userAmountSelected >= this.amount) {
                    this.saleData = {
                        user_id: this.username,
                        action: 'sale',
                        crypto_code: this.selectedCripto,
                        crypto_amount: this.amount,
                        money: this.money,
                        datetime: new Date(),
                    };
                }
                else { alert('Cripto insuficiente en la billetera.'); }

            }
        },

        fetchState() {
            this.getState(this.username)
                .then((response) => {
                    this.userBTC = response.BTC;
                    this.userETH = response.ETH;
                    this.userUSDC = response.USDC;
                    this.userUSDT = response.USDT;
                })
                .catch((error) => {
                    console.error('Error al obtener el estado de la cuenta:', error);
                });
        },

        newTransaction(saleData) {
            this.$store.dispatch('transactions/newTransaction', saleData)
                .then((response) => {
                    console.log('Venta registrada con éxito', response);
                    this.money = 0;
                    this.amount = 0;
                    location.reload();
                })
                .catch((error) => {
                    console.error('Error al crear la venta:', error);
                });
        },

    },
    watch: {
        selectedCripto() {
            this.money = 0;
            this.amount = 0;
        },
    },
    created() {
        this.fetchState();
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
