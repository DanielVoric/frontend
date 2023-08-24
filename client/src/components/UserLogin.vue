<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="username" placeholder="Username" required />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
  async handleLogin() {
    try {
      const response = await axios.post('http://localhost:5000/auth/login', {
        username: this.username,
        password: this.password
      });

// cuvanje tokena za kasnije
      localStorage.setItem('token', response.data.token); 
      this.$router.push('/').then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error('Login failed:', error.response ? error.response.data : error.message);
    }
  }
}
,
};
</script>
