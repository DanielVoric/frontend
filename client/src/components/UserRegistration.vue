<template>
  <div class="pozadina">
    <div class="outer-container">
      <div class="huge-text-container">
        <h1 class="huge-text">Koktelomat</h1>
      </div>
      <section class="box container">
        <h2 class="custom-register-text">Register</h2>
        <form @submit.prevent="handleRegistration" class="centered-form">
          <input
            class="input-field"
            v-model="username"
            placeholder="Username"
            required
          />
          <input
            class="input-field"
            v-model="email"
            placeholder="Email"
            type="email"
            required
          />
          <input
            class="input-field"
            type="password"
            v-model="password"
            placeholder="Password"
            required
          />
          <input
            class="input-field"
            v-model="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            required
          />
          <button class="rainbow-hover" data-label="Register" type="submit">
            <span>Register</span>
          </button>
        </form>
        <p class="login-text" @click="goToLogin">or back to login</p>
        <p class="age-confirmation-text">
          By registering you are confirming to be over 18 years of age.
        </p>
      </section>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  mounted() { //ne koristim
    this.initRainbowHover();
  },
  methods: {
    async handleRegistration() {
      if (this.password !== this.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }
      try {
        const response = await axios.post(
          "https://koktelomat.onrender.com/auth/register",
          {
            username: this.username,
            email: this.email,
            password: this.password,
          }
        );
        alert(response.data.message);
        this.$router.push("/login");
      } catch (error) {
        alert(
          error.response ? error.response.data.message : "Registration failed."
        );
      }
    },
    goToLogin() {
      this.$router.push("/login");
    },
    initRainbowHover() { //ne koristim...donekle
      document.querySelectorAll(".rainbow-hover").forEach((button) => {
        const rect = button.getBoundingClientRect();
        button.addEventListener("mousemove", (e) => {
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          button.style.setProperty(
            "--rx",
            `${(y - rect.height / 2) * -0.4}deg`
          );
          button.style.setProperty("--ry", `${(x - rect.width / 2) * 0.07}deg`);
        });
        button.addEventListener("mouseleave", () => {
          button.style.setProperty("--rx", "0deg");
          button.style.setProperty("--ry", "0deg");
        });
      });
    },
  },
};
</script>
