<template>
  <div class="login">
    <span>INICIA SESIÓN</span>
      <h1>para comprar y vender criptos!</h1>
    <div id="login-form">
      <input class="form-control" v-model="username" @keydown.enter="handleLogin" placeholder="Nombre de usuario" />
      <button @click="handleLogin" class="btn btn-outline-light">Iniciar sesión</button>
    </div>
  </div>
</template>
  
<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      username: ''
    };
  },
  methods: {
    ...mapActions(['login']),

    async handleLogin() {
      const usernamePattern = /^[a-zA-Z0-9]{5,15}$/;

      if (this.username && usernamePattern.test(this.username)) {
        await this.login(this.username);
        this.$router.push('/#'); // Redirect to home after login
      } else {
        alert('Ingrese un ID de usuario válido. Debe tener entre 5 y 15 caracteres alfanuméricos.');
      }
    }
  },
  computed: {
    ...mapGetters(['isLoggedIn'])
  }
};
</script>
  
<style scoped>

  h1{
    font-size: 30px;
    padding: 0px;
    margin: 0px;
  }

  span{
    font-size: 50px;
    padding: 0px;
    margin: 0px;
  }
  
  #login-form{
    display: flex;
    flex-direction: column;
    width: 100%;

    align-items: center;
    justify-content: center;

    row-gap: 15px;

  }

  .form-control{
    width: 50%;
    margin-top: 25px;
  } 
  
</style>
  