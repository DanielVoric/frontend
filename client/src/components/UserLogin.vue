<template>
  <div class="pozadina">
    <div class="outer-container">
      <div class="huge-text-container">
        <h1 class="huge-text">Koktelomat</h1>
      </div>
      <section class="box container">
        <h2 class="custom-register-text">Login</h2>
        <form @submit.prevent="handleLogin" class="centered-form">
          <input
            class="input-field"
            v-model="username"
            placeholder="Username"
            required
          />
          <input
            class="input-field"
            type="password"
            v-model="password"
            placeholder="Password"
            required
          />
          <button class="rainbow-hover" data-label="Login" type="submit">
            <span>Login</span>
          </button>
        </form>
        <div class="bigger-text text-center">
          <p>or</p>
          <button
            class="rainbow-hover"
            data-label="Register"
            @click="goToRegister"
          >
            <span>Register</span>
          </button>
        </div>
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
      password: "",
    };
  },
  mounted() {
    this.initRainbowHover();
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post("http://localhost:5000/auth/login", {
          username: this.username,
          password: this.password,
        });
        localStorage.setItem("token", response.data.token);
        this.$router.push("/").then(() => {
          window.location.reload();
        });
      } catch (error) {
        console.error(
          "Login failed:",
          error.response ? error.response.data.message : error.message
        );
        alert(error.response ? error.response.data.message : "Login failed.");
      }
    },
    goToRegister() {
      this.$router.push("/register");
    },
    initRainbowHover() {
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
