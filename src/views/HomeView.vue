<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <p>Usuario: {{ username }}</p>
  </div> 
</template>

<script>
import { mapGetters} from 'vuex';
export default {
  name: 'HomeView',
  computed: {
    ...mapGetters(['username'])
  }
}
</script>
