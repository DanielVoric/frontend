<template>
  <div class="mt-4">
    <div v-for="cocktail in cocktails" :key="cocktail._id" class="card mb-3">
      <div class="card-header">
        {{ cocktail.name }}
        
        <span @click="toggleFavorite(cocktail)">
            <i :class="cocktail.isFavorite ? 'fas fa-star gold' : 'far fa-star black'"></i>
        </span>
        
        <!-- Pokazi "Are you sure?" samo ako se pretisne delete -->
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
        
        <!-- else pokazi delete -->
        <button
          v-else
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
          class="list-group-item"
        >
          {{ ingredient }}
        </li>
        <li
          v-for="ingredient in cocktail.ingredients.juice"
          :key="ingredient"
          class="list-group-item"
        >
          {{ ingredient }}
        </li>
        <li
          v-for="ingredient in cocktail.ingredients.other"
          :key="ingredient"
          class="list-group-item"
        >
          {{ ingredient }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["cocktails"],
  data() {
    return {
      cocktailToDelete: null,
    };
  },
  methods: {
    async toggleFavorite(cocktail) {
      try {
        const response = await axios.put(`http://localhost:5000/cocktails/toggle-favorite/${cocktail._id}`);
        if (response.status === 200) {
          cocktail.isFavorite = !cocktail.isFavorite;
        }
      } catch (error) {
        console.error("Error updating favorite status:", error);
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
        window.location.reload();
      } catch (error) {
        console.error("Error deleting cocktail:", error);
        alert("Failed to delete cocktail. Please check the console for more details.");
      }
    },
  },
};
</script>

<style scoped>
.gold {
    color: gold;
}

.black {
    color: black;
}
</style>
