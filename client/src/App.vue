<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <!-- kad nisam logged in -->
      <div class="navbar-nav mr-auto">
        <div v-if="!isAuthenticated">
          <router-link to="/login" class="nav-item nav-link">Login</router-link>
          <router-link to="/register" class="nav-item nav-link">Register</router-link>
        </div>
        <div v-else>
          <!-- kad sam logged in -->
          <router-link to="/" class="nav-item nav-link">Home</router-link>
          <router-link to="/add" class="nav-item nav-link">Add Cocktail</router-link>
          <router-link to="/all-cocktails" class="btn btn-link nav-item nav-link">List All Cocktails</router-link>
        </div>
      </div>
      <div v-if="isAuthenticated" class="navbar-nav">
        <button class="nav-item nav-link btn btn-danger" @click="logout">Logout</button>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return !!localStorage.getItem('token');
    }
  },
  watch: {
    $route() {
      this.$forceUpdate();
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login').then(() => {
        window.location.reload();
      });
    }
}

};
</script>
