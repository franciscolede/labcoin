<template>
  <div class="sale-page">
    <h1>Vista venta</h1>
    <saleComponent></saleComponent>
  </div>
</template>

<script>
import saleComponent from '../components/actionsComponents/saleComponent.vue'; 

export default {
  name: "SaleView",
  components: {
    saleComponent,
  },
};
</script>

<style scoped>
.sale-page {
  padding: 10px;
}
</style>
