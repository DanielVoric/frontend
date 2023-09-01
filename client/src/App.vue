<template>
  <div id="app">
    <!-- renderaj navbar samo na /register i /login -->
    <div v-if="$route.path !== '/register' && $route.path !== '/login'">
      <nav
        class="navbar navbar-expand-lg navbar-dark fixed-top"
        style="background-color: brown"
      >
        <div class="container-fluid">
          <router-link to="/" class="navbar-brand">Koktelomat</router-link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div
            class="collapse navbar-collapse justify-content-between"
            id="navbarCollapse"
          >
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link to="/" class="nav-link">Home</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/add" class="nav-link">Add Cocktail</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/all-cocktails" class="nav-link">List All Cocktails</router-link>
              </li>
            </ul>

            <div v-if="isAuthenticated" class="d-flex align-items-center">
              <span class="navbar-text mr-2">Logged in as: {{ username }}</span>
              <button class="nav-item nav-link btn btn-danger" @click="logout">
                Logout
              </button>
            </div>

            <div v-else class="d-flex align-items-center">
              <router-link to="/login" class="nav-item nav-link btn btn-primary">
                Login
              </router-link>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <router-view></router-view>
    <footer class="app-footer">
      <p>Created by Daniel Vorić, contact: dvoric@student.unipu.hr</p>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem("token");
    },
    username() {
      return localStorage.getItem("username");
    },
  },
  watch: {
    $route() {
      this.$forceUpdate();
    },
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("username");
      this.$router.push("/login").then(() => {
        window.location.reload();
      });
    },
  },
};
</script>

<style>
.app-footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  background-color: none;
  color: darkslategrey;
  font-size: 12px;
  padding: 5px;
}
</style>
