<template>
    <div class="login-page">
      <login :username="username" :logged="logged" />
    </div>
  </template>
  
  <script>
  import Login from '../components/Login.vue';
  
  export default {
    props: ['username', 'logged'], // Recibiendo las props desde App.vue
    components: {
      Login,
    }
  };
  </script>
  
  <style scoped>
  .login-page {
    padding: 10px;
  }
  </style>
  