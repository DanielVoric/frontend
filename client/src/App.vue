<template>
  <div id="app">
   <!-- Bootstrap-styled navigation bar -->
   <nav class="navbar navbar-expand-lg navbar-light bg-light">
     <a class="navbar-brand" href="#">Cocktails</a>
     <div class="navbar-nav">
       <router-link to="/" class="nav-item nav-link">Home</router-link>
       <router-link to="/add" class="nav-item nav-link">Add Cocktail</router-link>
       <router-link to="/all-cocktails" class="btn btn-link nav-item nav-link">List All Cocktails</router-link>
     </div>
   </nav>

   <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      cocktails: []  // If you still need this for the `listAllCocktails` function
    };
  },
  methods: {
    async listAllCocktails() {
      try {
        const response = await axios.get("http://localhost:5000/cocktails");
        this.cocktails = response.data;  // You might want to re-structure this logic since you're no longer displaying this data in this component
      } catch (error) {
        console.error("Error fetching all cocktails:", error);
        alert('Failed to fetch all cocktails. Please check the console for more details.');
      }
    }
  }
};
</script>
