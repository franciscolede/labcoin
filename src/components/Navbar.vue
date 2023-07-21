<template>
  <nav class="navbar navbar-expand-md">
    <div class="container-fluid">
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar-toggler" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbar-toggler">
        <a class="navbar-brand" href="#">LABCOIN</a>
        <ul class="navbar-nav d-flex justify-content-center align-items-center">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Compra</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link">Venta</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link">Historial</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  // Puedes agregar propiedades, eventos u otros datos si es necesario
}
</script>

<style>
.navbar {
  padding: 2rem;
  background-color: #000f00;
}

.navbar-brand{
  --bs-navbar-brand-color: white;
  --bs-navbar-brand-hover-color: gray;
  --bs-navbar-brand-disabled-color: black;
}

.navbar-collapse{
  align-items: center;
  justify-content: space-between;
}

.nav-link{
  --bs-nav-link-color: white;
  --bs-nav-link-hover-color: gray;
  --bs-nav-link-disabled-color: black;
}

/* Responsive */


@media screen and (max-width: 767px){
 .navbar-brand{
  display: none;
 }
}

</style>