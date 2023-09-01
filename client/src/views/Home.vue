<template>
  <div class="home-page-background">
    <div class="container mt-4">
      <div class="main-container">
        <div class="left-container">
          <h1 class="title">Select ingredients You have to make cocktails:</h1>
          <div
            class="blurred-box alcohol scrollable-box cocktail-list-container2"
          >
            <h2 class="title3">Alcohol:</h2>
            <div v-for="alcohol in allAlcohols" :key="alcohol">
              <input
                type="checkbox"
                v-model="selectedAlcohol"
                :value="alcohol"
              />{{ alcohol }}<br />
            </div>
          </div>
          <div
            class="blurred-box juice scrollable-box cocktail-list-container2"
          >
            <h2 class="title3">Juices:</h2>
            <div v-for="juice in allJuices" :key="juice">
              <input type="checkbox" v-model="selectedJuice" :value="juice" />{{
                juice
              }}<br />
            </div>
          </div>
          <div
            class="blurred-box other scrollable-box cocktail-list-container2"
          >
            <h2 class="title3">Other:</h2>
            <div v-for="other in allOthers" :key="other">
              <input type="checkbox" v-model="selectedOther" :value="other" />{{
                other
              }}<br />
            </div>
          </div>
        </div>

        <button
          class="btn find-cocktails-button custom-button"
          @click="searchCocktails"
        >
          <div class="arrow-lines">></div>
          <div class="arrow-lines">></div>
          Find Cocktails
          <div class="arrow-lines">></div>
          <div class="arrow-lines">></div>
        </button>

        <div class="right-container">
          <h1 class="title">
            Possible cocktails with the selected ingredients:
          </h1>
          <div
            class="blurred-box cocktails scrollable-box cocktail-list-container2"
          >
            <CocktailList
              :cocktails="cocktails"
              v-if="cocktails.length"
              @delete="handleCocktailDelete"
            />
            <p v-else>You cannot make any cocktails with these ingredients.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import CocktailList from "@/components/CocktailList.vue";

export default {
  name: "HomePage",
  components: {
    CocktailList,
  },
  data() {
    return {
      selectedAlcohol: [],
      selectedJuice: [],
      selectedOther: [],
      cocktails: [],
      allAlcohols: [],
      allJuices: [],
      allOthers: [],
    };
  },
  created() {
    this.fetchAllIngredients();
  },
  methods: {
    async searchCocktails() {
      if (
        this.selectedAlcohol.length === 0 &&
        this.selectedJuice.length === 0 &&
        this.selectedOther.length === 0
      ) {
        alert("Please select at least one ingredient to find cocktails.");
        return;
      }

      try {
        const response = await axios.get(
          "https://koktelomat.onrender.com/cocktails/search",
          {
            params: {
              alcohol: this.selectedAlcohol.join(","),
              juice: this.selectedJuice.join(","),
              other: this.selectedOther.join(","),
            },
          }
        );
        this.cocktails = response.data;
      } catch (error) {
        console.error("Error fetching cocktails:", error);
        alert(
          "Failed to fetch cocktails. Please check the console for more details."
        );
      }
    },

    async listAllCocktails() {
      try {
        const response = await axios.get("https://koktelomat.onrender.com/cocktails");
        this.cocktails = response.data;
      } catch (error) {
        console.error("Error fetching all cocktails:", error);
        alert(
          "Failed to fetch all cocktails. Please check the console for more details."
        );
      }
    },

    async fetchAllIngredients() {
      try {
        const response = await axios.get(
          "https://koktelomat.onrender.com/cocktails/ingredients"
        );
        this.allAlcohols = response.data.alcohol.sort();
        this.allJuices = response.data.juice.sort();
        this.allOthers = response.data.other.sort();
      } catch (error) {
        console.error("Error fetching ingredients:", error);
      }
    },
    //"refresha" kada pretisnem delete na filteru
    handleCocktailDelete(cocktailId) {
      this.cocktails = this.cocktails.filter(
        (cocktail) => cocktail._id !== cocktailId
      );
    },
  },
};
</script>
<style></style>
