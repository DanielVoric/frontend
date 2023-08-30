<template>
  <div class="home-page-background">
    <div class="container mt-4">
      <div class="main-container">
        <div class="left-container">
          <h1 class="title">Select ingredients You have to make cocktails:</h1>
          <div class="blurred-box alcohol scrollable-box">
            <h2>Alcohol:</h2>
            <div v-for="alcohol in allAlcohols" :key="alcohol">
              <input
                type="checkbox"
                v-model="selectedAlcohol"
                :value="alcohol"
              />{{ alcohol }}<br />
            </div>
          </div>
          <div class="blurred-box juice scrollable-box">
            <h2>Juices:</h2>
            <div v-for="juice in allJuices" :key="juice">
              <input type="checkbox" v-model="selectedJuice" :value="juice" />{{
                juice
              }}<br />
            </div>
          </div>
          <div class="blurred-box other scrollable-box">
            <h2>Other:</h2>
            <div v-for="other in allOthers" :key="other">
              <input type="checkbox" v-model="selectedOther" :value="other" />{{
                other
              }}<br />
            </div>
          </div>
        </div>

        <button
          class="btn btn-primary find-cocktails-button custom-button"
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
          <div class="blurred-box cocktails scrollable-box">
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
          "http://localhost:5000/cocktails/search",
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
        const response = await axios.get("http://localhost:5000/cocktails");
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
          "http://localhost:5000/cocktails/ingredients"
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
<style>
.home-page-background {
  background-image: url("../../public/images/bar5.jpg");
  background-size: cover;
  background-attachment: fixed;
  background-position: calc(50% - 43.5px) 50%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-container {
  height: 100vh;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
}

.left-container {
  margin-left: -50px;
  width: 40%;
}

.find-cocktails-button {
  align-self: center;
}

.right-container {
  margin-right: -50px;
  width: 40%;
}

.blurred-box {
  background-color: rgba(73, 73, 73, 0.8);
  backdrop-filter: blur(4px);
  margin: 10px;
  padding: 10px;
  color: aliceblue;
}

.scrollable-box {
  overflow-y: auto;
}
.left-container .scrollable-box {
  max-height: 200px;
}
.right-container .blurred-box.cocktails.scrollable-box {
  flex-grow: 1;
  max-height: 640px;
  overflow-y: auto;
}

body,
html {
  overflow: hidden;
}
.left-container,
.right-container {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}
.right-container .blurred-box.cocktails {
  flex-grow: 1;
}

.title {
  font-size: 24px;
  text-transform: uppercase;
  font-family: "Gambetta", serif;
  letter-spacing: 3px;
  transition: 700ms ease;
  font-variation-settings: "wght" 311;
  margin-bottom: 0.8rem;
  color: white;
  outline: none;
  text-align: center;
  font-style: italic;
  font-weight: bold;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
  padding-top: 80px;
}

.find-cocktails-button {
  align-self: center;
  height: 300px;
  font-size: 18px;
  line-height: 60px;
}
.custom-button .arrow-lines {
  text-align: center;
  margin: 0;
}
.right-container .blurred-box.cocktails .matched-cocktail-name {
  color: black;
}
.right-container .blurred-box.cocktails .matched-ingredient {
  color: black;
}
</style>
