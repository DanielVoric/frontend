<template>
  <div class="mt-4"> <!--iterira kroz sortedCocktails i stvara nove kartice sa koktelima -->
    <div
      v-for="cocktail in sortedCocktails" 
      :key="cocktail._id"
      class="card mb-3"
    >
      <div class="card-header cocktail-form1">
        <div class="matched-cocktail-name">
          {{ cocktail.name }}
        </div>

        <div class="button-container float-right">
          <template v-if="cocktailToDelete === cocktail._id">
            <button
              class="btn btn-warning btn-sm ml-2 confirm-delete-yes"
              @click="confirmDelete(cocktail._id)"
            >
              Yes
            </button>
            <button
              class="btn btn-secondary btn-sm confirm-delete-no"
              @click="cancelDelete"
            >
              No
            </button>
            <span class="confirm-delete-text">Are you sure?&nbsp;</span>
          </template>
          <button
            v-else-if="cocktail.isDeletable"
            class="btn btn-danger btn-sm ml-2 delete-button"
            @click="prepareToDelete(cocktail._id)"
          >
            Delete
          </button>

          <label
            v-if="cocktail.isFavorited"
            class="custom-checkbox ml-2 favorite-container"
            @click="toggleFavorite(cocktail._id, cocktail.isFavorited)"
          >
            <input type="checkbox" checked />
            <i class="glyphicon glyphicon-star-empty favorite-star-icon"></i>
            <i class="glyphicon glyphicon-star favorite-star-icon"></i>
            <span class="favorite-text">Favorite</span>
          </label>
          <label
            v-else
            class="custom-checkbox ml-2 favorite-container"
            @click="toggleFavorite(cocktail._id, cocktail.isFavorited)"
          >
            <input type="checkbox" />
            <i class="glyphicon glyphicon-star-empty favorite-star-icon"></i>
            <i class="glyphicon glyphicon-star favorite-star-icon"></i>
            <span class="favorite-text">Favorite</span>
          </label>
        </div>

        <!--iterira i ispisuje sastojke-->
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
  props: ["cocktails"], //dobiva properties of parent componenta
  data() {
    return {
      localCocktails: [],
      cocktailToDelete: null,
      userFavorites: [],
    };
  },
  computed: {
  sortedCocktails() { //provjerava jesu li favoritani, te sortira (prvo favoriti pa alphabetical)
    return [...this.localCocktails].sort((a, b) => {
      if (a.isFavorited && !b.isFavorited) return -1;
      if (!a.isFavorited && b.isFavorited) return 1;
      
      return a.name.localeCompare(b.name);
    });
  },
},

  created() {
    this.fetchUserFavorites(); //popunjava userFavorites data sa api-a
  },
  watch: { //kada se promjeni cocktails, azurira se sa novom vrijednosti u loclacocktails?
    cocktails: {
      immediate: true,
      handler(newValue) {
        this.localCocktails = [...newValue];
      },
    },
  },
  methods: {
    //dohvaca favorite
    async fetchUserFavorites() {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(
          "https://koktelomat.onrender.com/cocktails/favorites",
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
    //azurira favorite, ovisno o odabiru
    updateCocktailsFavoritesStatus() {
      this.localCocktails.forEach((cocktail) => {
        cocktail.isFavorited = this.userFavorites.includes(cocktail._id);
      });
      this.localCocktails.sort((a, b) => b.isFavorited - a.isFavorited);
    },
    async toggleFavorite(cocktailId, isFavorited) { //add/remove favorite
      console.log("Toggling favorite for", cocktailId); // Debug line
      try {
        const token = localStorage.getItem("authToken"); //provjerava koji je user (po tokenu)
        const response = await axios.put(
          `https://koktelomat.onrender.com/cocktails/${cocktailId}/favorite`,
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
        await axios.delete(`https://koktelomat.onrender.com/cocktails/${cocktailId}`);
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

<style></style>
