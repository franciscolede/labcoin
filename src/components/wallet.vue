<template>
    Billetera de {{ username }}
            <div class="row">
                <div class="col">BTC<p>{{ userBTC.toFixed(6) }}</p>
                </div>
                <div class="col">ETH<p>{{ userETH.toFixed(6) }}</p>
                </div>
                <div class="col">USDC<p>{{ userUSDC.toFixed(6) }}</p>
                </div>
                <div class="col">USDT<p>{{ userUSDT.toFixed(6) }}</p>
                </div>
            </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';


export default {
    data() {
        return {
            userBTC: 0,
            userETH: 0,
            userUSDC: 0,
            userUSDT: 0,
        }
    },
    computed: {
        ...mapGetters([
            'username'
        ]),
    },
    methods: {
        ...mapActions('transactions', ['getState']),

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
    },
    created() {
        this.fetchState();
    },
};
</script>