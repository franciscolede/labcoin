<template>
  <nav class="navbar navbar-expand-md">
    <div class="container-fluid">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbar-toggler"
        aria-controls="navbarTogglerDemo01"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <router-link to="/" class="navbar-brand"><img id="logo" src="../assets/logo.png" alt="logo-labcoin"></router-link>
      <div class="collapse navbar-collapse" id="navbar-toggler">
        <ul class="navbar-nav d-flex justify-content-center align-items-center">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Inicio</router-link>
          </li>
          <li v-if="!isLoggedIn" class="nav-item">
            <router-link to="/login" class="nav-link">Ingresar</router-link>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <router-link to="/purchase" class="nav-link">Compra</router-link>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <router-link to="/sale" class="nav-link">Venta</router-link>
          </li>
        </ul>
        <ul class="navbar-nav d-flex justify-content-center align-items-center">
          <li v-if="isLoggedIn">
            <div class="nav-link"><Dropdown/></div>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <button class="btn btn-outline-danger btn-sm" @click="handleLogout">Salir</button>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <router-link to="/#" class="nav-link"><img id="userImage" src="../assets/anonUser.png" alt="anonUser"></router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters} from 'vuex';
import { mapActions } from 'vuex';
import Dropdown from '@/components/buttons/dropdown.vue'; 
export default {
  components: {
    Dropdown,
  },
  computed: {
    ...mapGetters(['username', 'isLoggedIn'])
  },
  methods: {
    ...mapActions(['logout']),
    
    async handleLogout() {
      await this.logout();
      this.$router.push('/#');
    }
  },
}
</script>

<style>

#logo{
  height: 30px;
}

#userImage{
  height: 25px;
  border-radius: 50%;
}

.navbar {
  background-color: rgb(217, 240, 232);
}

.navbar-brand {
  --bs-navbar-brand-color: rgb(0, 61, 43);
  --bs-navbar-brand-hover-color: rgb(0, 61, 43);
  --bs-navbar-brand-disabled-color: black;
}

.navbar-collapse {
  align-items: center;
  justify-content: space-between;
}

.nav-link {
  --bs-nav-link-color: rgb(0, 61, 43);
  --bs-nav-link-hover-color: rgb(0, 0, 0);
  --bs-nav-link-disabled-color: black;
}

/* Responsive */

@media screen and (max-width: 767px) {
  .navbar-brand {
    display: none;
  }
}
</style>
