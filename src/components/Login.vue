<template>
  <div v-if="username === ''" class="login">
    <span>INICIA SESIÓN</span>
      <h1>para comprar y vender criptos!</h1>
    <div id="login-form">
      <input class="form-control" :value="localUsername" @input="updateLocalUsername" @keydown.enter="submitForm" placeholder="Nombre de usuario" />
      <button @click="submitForm" class="btn btn-outline-light">Iniciar sesión</button>
    </div>
  </div>
</template>
  
<script>
import { mapGetters} from 'vuex';
  export default {
    data() {
      return{
        localUsername: "",
      }
    },
  methods: {
    updateLocalUsername(event){
      this.localUsername = event.target.value;
    },
    submitForm() {
      if (/^[a-zA-Z0-9]{4,15}$/.test(this.localUsername)) {
        this.$store.commit('setUsername', this.localUsername);

        this.$router.push('/');
      } else {
        alert("Ingresa un nombre de usuario válido (sin espacios, alfanumérico, entre 4 y 15 caracteres).");
      }
    },
  },
  computed: {
    ...mapGetters(['username'])
  }
}
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
  