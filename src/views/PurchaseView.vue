<template>
  <div class="purchase-page">
    <h1>COMPRANDO CRIPTO</h1>
    <purchaseComponent class="purchase-component"/>
    <PriceHome class="price-home"/>
    <SaleHome/>
  </div>
</template>

<script>
import purchaseComponent from '../components/actionsComponents/purchaseComponent.vue'; 
import PriceHome from '../components/Home/PriceHome.vue'; 
import SaleHome from '../components/Home/SaleHome.vue'; 

export default {
  name: 'PurchaseView',
  components: {
    purchaseComponent,
    PriceHome,
    SaleHome
  },
}
</script>

<style scoped>
.purchase-component {
  padding: 20px 0px;
}

</style>