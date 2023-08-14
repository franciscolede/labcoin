<template>
  <div class="login">
    <div>
      <input :value="localUsername" @input="updateLocalUsername" @keydown.enter="submitForm" placeholder="Nombre de usuario" />
      <button @click="login">Iniciar sesión</button>
    </div>
    <p>Bienvenido {{ username }}</p>
    <p>Logueado ? {{ logged }}</p>
  </div>
</template>
  
<script>
  export default {
  data() {
    return {
      localUsername: '', // Nuevo dato local para el input
    };
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
    logged(){
      return this.$store.state.logged;
    }
  },
  methods: {
    updateLocalUsername(event) {
      this.localUsername = event.target.value;
    },
    submitForm() {
      if (/^[a-zA-Z0-9]{4,15}$/.test(this.localUsername)) {
        this.$store.commit('setUsername', this.localUsername);
        this.$store.commit('setLogged', true);

        this.$router.push('/');
      } else {
        alert("Ingresa un nombre de usuario válido (sin espacios, alfanumérico, entre 4 y 15 caracteres).");
      }
    },
    login() {
      this.submitForm();
    },
  },
}
</script>
  
<style>
  
  
  /* Responsive */
  
</style>
  