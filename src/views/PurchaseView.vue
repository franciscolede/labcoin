<template>
  <div class="purchase-page">
    <h1>Purchase page</h1>
    <p>Bienvenido {{ username }}</p>
    <p>Logueado ? {{ logged }}</p>
  </div>
</template>

<script>
export default {
  props: ['username', 'logged'], // Recibiendo las props desde App.vue
  name: "PurchaseView",
  components: {},
};
</script>

<style scoped>
.purchase-page {
  padding: 10px;
}
</style>
