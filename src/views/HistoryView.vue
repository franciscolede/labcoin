<template>
  <div class="history-page">
    <h1>History page</h1>
  </div>
</template>

<script>
export default {
  props: ['username', 'logged'], // Recibiendo las props desde App.vue
  name: "HistoryView",
  components: {},
};
</script>

<style scoped>
.history-page {
  padding: 10px;
}
</style>
