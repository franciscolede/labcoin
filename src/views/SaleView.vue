<template>
  <div class="sale-page">
    <h1>Vista venta</h1>
    <saleComponent class="sale-component"/>
    <PriceHome class="price-home"/>
    <PurchaseHome/>
  </div>
</template>

<script>
import saleComponent from '../components/actionsComponents/saleComponent.vue'; 
import PriceHome from '../components/Home/PriceHome.vue'; 
import PurchaseHome from '../components/Home/PurchaseHome.vue'; 

export default {
  name: "SaleView",
  components: {
    saleComponent,
    PriceHome,
    PurchaseHome
  },
};
</script>

<style scoped>

.sale-component {
  padding: 20px 0px;
}

</style>
