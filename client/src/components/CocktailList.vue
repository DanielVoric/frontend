<template>
  <div class="mt-4">
    <div
      v-for="cocktail in sortedCocktails"
      :key="cocktail._id"
      class="card mb-3"
    >
      <div class="card-header cocktail-form">
        <div class="matched-cocktail-name">
          {{ cocktail.name }}
          <button
            class="btn btn-sm float-right ml-2"
            :class="cocktail.isFavorited ? 'btn-warning' : 'btn-secondary'"
            @click="toggleFavorite(cocktail._id, cocktail.isFavorited)"
          >
            ⭐
          </button>

          <template v-if="cocktailToDelete === cocktail._id">
            <button
              class="btn btn-warning btn-sm float-right ml-2"
              @click="confirmDelete(cocktail._id)"
            >
              Yes
            </button>
            <button
              class="btn btn-secondary btn-sm float-right"
              @click="cancelDelete"
            >
              No
            </button>
            <span class="float-right">Are you sure?&nbsp;</span>
          </template>

          <button
            v-else-if="cocktail.isDeletable"
            class="btn btn-danger btn-sm float-right ml-2"
            @click="prepareToDelete(cocktail._id)"
          >
            Delete
          </button>
        </div>
        <ul class="list-group list-group-flush">
          <li
            v-for="ingredient in cocktail.ingredients.alcohol"
            :key="ingredient"
            class="list-group-item matched-ingredient alcohol"
          >
            {{ ingredient }}
          </li>
          <li
            v-for="ingredient in cocktail.ingredients.juice"
            :key="ingredient"
            class="list-group-item matched-ingredient juice"
          >
            {{ ingredient }}
          </li>
          <li
            v-for="ingredient in cocktail.ingredients.other"
            :key="ingredient"
            class="list-group-item matched-ingredient other"
          >
            {{ ingredient }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  props: ["cocktails"],
  data() {
    return {
      localCocktails: [],
      cocktailToDelete: null,
      userFavorites: [],
    };
  },
  computed: {
    sortedCocktails() {
      return [...this.localCocktails].sort(
        (a, b) => b.isFavorited - a.isFavorited
      );
    },
  },
  created() {
    this.fetchUserFavorites();
  },
  watch: {
    cocktails: {
      immediate: true,
      handler(newValue) {
        this.localCocktails = [...newValue];
      },
    },
  },
  methods: {
    async fetchUserFavorites() {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "http://localhost:5000/cocktails/favorites",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.userFavorites = response.data;
        this.updateCocktailsFavoritesStatus();
      } catch (error) {
        console.error("Failed to fetch user favorites:", error);
      }
    },
    updateCocktailsFavoritesStatus() {
      this.localCocktails.forEach((cocktail) => {
        cocktail.isFavorited = this.userFavorites.includes(cocktail._id);
      });
      this.localCocktails.sort((a, b) => b.isFavorited - a.isFavorited);
    },
    async toggleFavorite(cocktailId, isFavorited) {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.put(
          `http://localhost:5000/cocktails/${cocktailId}/favorite`,
          {
            isFavorited: !isFavorited,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          const cocktail = this.localCocktails.find(
            (c) => c._id === cocktailId
          );
          cocktail.isFavorited = !isFavorited;
        } else {
          throw new Error("Failed to toggle favorite");
        }
      } catch (error) {
        console.error("Error toggling favorite:", error);
      }
    },
    prepareToDelete(cocktailId) {
      this.cocktailToDelete = cocktailId;
    },
    cancelDelete() {
      this.cocktailToDelete = null;
    },
    async confirmDelete(cocktailId) {
      try {
        await axios.delete(`http://localhost:5000/cocktails/${cocktailId}`);
        this.$emit("delete", cocktailId);
        this.cocktailToDelete = null;
      } catch (error) {
        console.error("Error deleting cocktail:", error);
        alert(
          "Failed to delete cocktail. Please check the console for more details."
        );
      }
    },
  },
};
</script>

<style scoped>
.matched-ingredient {
  color: black;
}
.matched-ingredient.alcohol {
  border: 1.5px solid black;
  background-color: lightblue;
}
.matched-ingredient.juice {
  background-color: pink;
  border: 1.5px solid black;
}
.matched-ingredient.other {
  background-color: lightyellow;
  border: 1.5px solid black;
}

.matched-cocktail-name {
  font-weight: bold;
  font-size: medium;
}
.cocktail-form {
  background-color: rgba(70, 73, 73, 0.8);
  backdrop-filter: blur();
}
</style>
