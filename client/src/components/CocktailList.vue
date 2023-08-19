<template>
  <div class="mt-4">
    <div v-for="cocktail in cocktails" :key="cocktail._id" class="card mb-3">
      <div class="card-header">{{ cocktail.name }}</div>
      <ul class="list-group list-group-flush">
        <li v-for="ingredient in cocktail.ingredients.alcohol" :key="ingredient" class="list-group-item">
          {{ ingredient }}
        </li>
        <li v-for="ingredient in cocktail.ingredients.juice" :key="ingredient" class="list-group-item">
          {{ ingredient }}
        </li>
        <li v-for="ingredient in cocktail.ingredients.other" :key="ingredient" class="list-group-item">
          {{ ingredient }}
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  props: ["cocktails"]
};
</script>
