<template>
  <div class="container2">
    <div class="blurry-box2">
      <h1 class="title2">All Cocktails</h1>
      <div class="cocktail-list-container2">
        <CocktailList
          :cocktails="cocktails"
          v-if="cocktails.length"
          @delete="handleCocktailDelete"
        />
        <p v-else>No cocktails available.</p>
      </div>
    </div>
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
  methods: { //dohvati sve koktele
    async fetchAllCocktails() {
      try {
        const response = await axios.get("https://koktelomat.onrender.com/cocktails");
        this.cocktails = response.data;
      } catch (error) {
        console.error("Error fetching all cocktails:", error);
      }
    },
    //refresha kada se brise
    handleCocktailDelete(cocktailId) {
      this.cocktails = this.cocktails.filter(
        (cocktail) => cocktail._id !== cocktailId
      );
    },
  },
};
</script>

<style></style>
