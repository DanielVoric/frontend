<template>
  <div class="container mt-4">
    <h1>Select Ingredients</h1>
    <div>
      <h2>Alcohol:</h2>
      <div v-for="alcohol in allAlcohols" :key="alcohol">
          <input type="checkbox" v-model="selectedAlcohol" :value="alcohol">{{ alcohol }}<br>
      </div>

      <h2>Juices:</h2>
      <div v-for="juice in allJuices" :key="juice">
          <input type="checkbox" v-model="selectedJuice" :value="juice">{{ juice }}<br>
      </div>

      <h2>Other:</h2>
      <div v-for="other in allOthers" :key="other">
          <input type="checkbox" v-model="selectedOther" :value="other">{{ other }}<br>
      </div>
    </div>

    <button class="btn btn-primary" @click="searchCocktails">Find Cocktails</button>

    <CocktailList :cocktails="cocktails" v-if="cocktails.length" @delete="handleCocktailDelete" />
    <p v-else>No matches found.</p>

    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
import CocktailList from "@/components/CocktailList.vue";

export default {
  name: 'HomePage',
  components: {
    CocktailList
  },
  data() {
    return {
      selectedAlcohol: [],
      selectedJuice: [],
      selectedOther: [],
      cocktails: [],
      allAlcohols: [],
      allJuices: [],
      allOthers: []
    };
  },
  created() {
    this.fetchAllIngredients();
  },
  methods: {
    async searchCocktails() {
      if (this.selectedAlcohol.length === 0 && this.selectedJuice.length === 0 && this.selectedOther.length === 0) {
        alert('Please select at least one ingredient to find cocktails.');
        return;
      }

      try {
        const response = await axios.get("http://localhost:5000/cocktails/search", {
          params: {
            alcohol: this.selectedAlcohol.join(","),
            juice: this.selectedJuice.join(","),
            other: this.selectedOther.join(",")
          }
        });
        this.cocktails = response.data;
      } catch (error) {
        console.error("Error fetching cocktails:", error);
        alert('Failed to fetch cocktails. Please check the console for more details.');
      }
    },

    async listAllCocktails() {
      try {
        const response = await axios.get("http://localhost:5000/cocktails");
        this.cocktails = response.data;
      } catch (error) {
        console.error("Error fetching all cocktails:", error);
        alert('Failed to fetch all cocktails. Please check the console for more details.');
      }
    },

    async fetchAllIngredients() {
  try {
    const response = await axios.get("http://localhost:5000/cocktails/ingredients");
    this.allAlcohols = response.data.alcohol.sort();
    this.allJuices = response.data.juice.sort();
    this.allOthers = response.data.other.sort();
  } catch (error) {
    console.error("Error fetching ingredients:", error);
  }
},
  //"refresha" kada pretisnem delete na filteru
    handleCocktailDelete(cocktailId) {
        this.cocktails = this.cocktails.filter(cocktail => cocktail._id !== cocktailId);
    }   
  }
};
</script>
