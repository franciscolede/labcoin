<template>
  <div class="purchase-page">
    <h1>Purchase page</h1>
    <p>Bienvenido {{ username }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "PurchaseView",
  computed: {
    ...mapState(['username']),
  },
  components: {},
};
</script>

<style scoped>
.purchase-page {
  padding: 10px;
}
</style>
