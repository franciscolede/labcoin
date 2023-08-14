<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
  </div>
</template>

<script>
export default {
  props: ['username', 'logged'], // Recibiendo las props desde App.vue
  name: 'HomeView',
  data() {
    return {
      localUsername: '', // Nuevo dato local para el input
    };
  },
  methods: {
    updateLocalUsername(event) {
      this.localUsername = event.target.value;
    },
    login() {
      this.$store.commit('setUsername', this.localUsername);
      this.$store.commit('setLogged')
    },
  }
}
</script>
