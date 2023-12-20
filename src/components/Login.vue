<template>
  <div class="login">
    <span>INICIA SESIÓN</span>
      <h1>para comprar y vender criptos!</h1>
    <div id="login-form">
      <input class="form-control" v-model="username" @keydown.enter="handleLogin" placeholder="Nombre de usuario" />
      <button @click="handleLogin" class="btn btn-outline-light">Iniciar sesión</button>
      <h6 v-if="error">Ingrese un ID de usuario válido. Debe tener entre 5 y 15 caracteres alfanuméricos.</h6>
    </div>
  </div>
</template>
  
<script>
import { mapActions} from 'vuex';

export default {
  data() {
    return {
      username: '',
      error: false,
    };
  },
  methods: {
    ...mapActions(['login']),

    async handleLogin() {
      const usernamePattern = /^[a-zA-Z0-9]{5,15}$/;

      if (this.username && usernamePattern.test(this.username)) {
        this.error = false;
        await this.login(this.username);
        this.$router.push('/#');
      } else {
        this.error = true;
        this.username = '';
      }
    }
  },
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
  