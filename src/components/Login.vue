<template>
  <div class="login">
    <div>
      <input :value="localUsername" @input="updateLocalUsername" @keydown.enter="submitForm" placeholder="Nombre de usuario" />
      <button @click="submitForm">Iniciar sesión</button>
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
  
<style>
  
  
  /* Responsive */
  
</style>
  