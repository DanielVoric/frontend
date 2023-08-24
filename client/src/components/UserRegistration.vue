<template>
  <div>
    <h2>Register</h2>
    <form @submit.prevent="handleRegistration">
      <input v-model="username" placeholder="Username" required />
      <input v-model="email" placeholder="Email" type="email" required />
      <input type="password" v-model="password" placeholder="Password" required />
      <input v-model="confirmPassword" type="password" placeholder="Confirm Password" required />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  },
  methods: {
    async handleRegistration() {
      if (this.password !== this.confirmPassword) {
        console.error('Passwords do not match!'); 
        return;
      }

      try {
        await axios.post('http://localhost:5000/auth/register', {
          username: this.username,
          email: this.email,
          password: this.password
        });
        this.$router.push('/login');
      } catch (error) {
        console.error('Registration failed:', error);
      }
    }
  }
};
</script>
