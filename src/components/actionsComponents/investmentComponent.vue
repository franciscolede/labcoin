<template>
    <div class="container mt-5">
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Criptomoneda</th>
                    <th scope="col">Resultado</th>
                </tr>
            </thead>
            <tbody>
                <tr v-if="BTC">
                    <td>BITCOIN</td>
                    <td :class="{ 'table-success': userBTC > 0 }" v-if="userBTC >= 0">+{{userBTC.toFixed(6)}}</td>
                    <td :class="{ 'table-danger': userBTC < 0 }" v-if="userBTC < 0">{{userBTC}}</td>
                </tr>
                <tr v-if="ETH">
                    <td>ETHEREUM</td>
                    <td :class="{ 'table-success': userETH > 0 }" v-if="userETH >= 0">+{{userETH.toFixed(6)}}</td>
                    <td :class="{ 'table-danger': userETH < 0 }" v-if="userETH < 0">{{userETH}}</td>
                </tr>
                <tr v-if="USDC">
                    <td>USDC</td>
                    <td :class="{ 'table-success': userUSDC > 0 }" v-if="userUSDC >= 0">+{{userUSDC.toFixed(6)}}</td>
                    <td :class="{ 'table-danger': userUSDC < 0 }" v-if="userUSDC < 0">{{userUSDC}}</td>
                </tr>
                <tr v-if="USDT">
                    <td>USDT</td>
                    <td :class="{ 'table-success': userUSDT > 0 }" v-if="userUSDT >= 0">+{{userUSDT.toFixed(6)}}</td>
                    <td :class="{ 'table-danger': userUSDT < 0 }" v-if="userUSDT < 0">{{userUSDT}}</td>
                </tr>
                <tr>
                    <td><b>TOTAL</b></td>
                    <td><b>asd</b></td>
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
            transactions: [],

            userBTC: 0,
            userETH: 0,
            userUSDC: 0,
            userUSDT: 0,

            BTC: false,
            ETH: false,
            USDC: false,
            USDT: false,

        };
    },

    created() {
        this.fetchHistory();
    },

    computed: {
        ...mapGetters(['username']),
    },

    methods: {
        ...mapActions('transactions', ['getHistory']),

        fetchHistory() {
            this.getHistory(this.username)
                .then((response) => {
                    console.log(response);
                    this.transactions = response.sort((a, b) => new Date(b.datetime) - new Date(a.datetime));
                    this.getInvestment(this.transactions)
                })
                .catch((error) => {
                    console.error('Error al obtener el historial:', error);
                });
        },

        getInvestment(transactions) {
            console.log("eee")
            for (const transaction of transactions) {
                if (transaction.crypto_code === 'btc') {
                    this.BTC = true;
                    transaction.action === "purchase" ? this.userBTC -= transaction.money : this.userBTC += transaction.money;
                } else if (transaction.crypto_code === 'eth') {
                    this.ETH = true;
                    transaction.action === "purchase" ? this.userETH -= transaction.money : this.userETH += transaction.money;
                } else if (transaction.crypto_code === 'usdc') {
                    this.USDC = true;
                    transaction.action === "purchase" ? this.userUSDC -= transaction.money : this.userUSDC += transaction.money;
                } else if (transaction.crypto_code === 'usdt') {
                    this.USDT = true;
                    transaction.action === "purchase" ? this.userUSDT -= transaction.money : this.userUSDT += transaction.money;
                }
            }
        }
    }
}
</script>

<style scoped></style>
