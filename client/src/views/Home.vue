<template>
    <div class="container mt-4">
      <h1>Select Ingredients</h1>
      <div>
        <h2>Alcohol:</h2>
        <input type="checkbox" v-model="selectedAlcohol" value="rum">Rum<br>
        <input type="checkbox" v-model="selectedAlcohol" value="vodka">Vodka<br>
  
        <h2>Juices:</h2>
        <input type="checkbox" v-model="selectedJuice" value="orange juice">Orange Juice<br>
        <input type="checkbox" v-model="selectedJuice" value="apple juice">Apple Juice<br>
  
        <h2>Other:</h2>
        <input type="checkbox" v-model="selectedOther" value="mint">Mint<br>
        <input type="checkbox" v-model="selectedOther" value="sugar">Sugar<br>
      </div>
  
      <button class="btn btn-primary" @click="searchCocktails">Find Cocktails</button>
  
      <CocktailList :cocktails="cocktails" v-if="cocktails.length" />
      <p v-else>No matches found.</p>
  
      <router-view></router-view>
    </div>
  </template>
  
  <script>
import axios from "axios";
import CocktailList from "@/components/CocktailList.vue";

export default {
  name: 'HomePage',  // This is the name property you need to add

  components: {
    CocktailList
  },
  data() {
    return {
      selectedAlcohol: [],
      selectedJuice: [],
      selectedOther: [],
      cocktails: []
    };
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
      }
    }
  };
  </script>
  