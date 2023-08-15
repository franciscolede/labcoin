<template>
    <div class="login-page">
      <Login/>
    </div>
  </template>
  
  <script>
  import Login from '../components/Login.vue';
  import { mapGetters} from 'vuex';
  
  export default {
    components: {
      Login,
    },
    computed: {
      ...mapGetters(['username'])
  }
  };
  </script>
  
  <style scoped>
  .login-page {
    padding: 10px;
  }
  </style>
  