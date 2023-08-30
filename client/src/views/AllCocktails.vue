<template>
  <div>
    <h1>All Cocktails</h1>
    <CocktailList
      :cocktails="cocktails"
      v-if="cocktails.length"
      @delete="handleCocktailDelete"
    />
    <p v-else>No cocktails available.</p>
  </div>
</template>

<script>
import axios from "axios";
import CocktailList from "@/components/CocktailList.vue";

export default {
  name: "AllCocktails",
  components: {
    CocktailList,
  },
  data() {
    return {
      cocktails: [],
    };
  },
  created() {
    this.fetchAllCocktails();
  },
  methods: {
    async fetchAllCocktails() {
      try {
        const response = await axios.get("http://localhost:5000/cocktails");
        this.cocktails = response.data;
      } catch (error) {
        console.error("Error fetching all cocktails:", error);
      }
    },

    handleCocktailDelete(cocktailId) {
      this.cocktails = this.cocktails.filter(
        (cocktail) => cocktail._id !== cocktailId
      );
    },
  },
};
</script>
