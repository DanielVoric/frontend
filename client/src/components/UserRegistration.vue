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
        alert('Passwords do not match!'); 
        return;
    }

    try {
        const response = await axios.post('http://localhost:5000/auth/register', {
            username: this.username,
            email: this.email,
            password: this.password
        });

        alert(response.data.message);
        this.$router.push('/login');
    } catch (error) {
        console.error('Registration failed:', error);
        alert(error.response ? error.response.data.message : 'Registration failed.');
    }
}

  }
};
</script>
