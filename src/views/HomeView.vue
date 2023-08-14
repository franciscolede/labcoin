<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div>
      <input :value="localUsername" @input="updateLocalUsername" placeholder="Nombre de usuario" />
      <button @click="login">Iniciar sesión</button>
    </div>
    <p>Bienvenido {{ username }}</p>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      localUsername: '', // Nuevo dato local para el input
    };
  },
  computed: {
    username() {
      return this.$store.state.username;
    },
  },
  methods: {
    updateLocalUsername(event) {
      this.localUsername = event.target.value;
    },
    login() {
      this.$store.commit('setUsername', this.localUsername);
    },
  }
}
</script>
