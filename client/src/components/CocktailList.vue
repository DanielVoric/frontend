<template>
  <div>
    <div v-for="cocktail in cocktails" :key="cocktail._id">
      <h2>{{ cocktail.name }}</h2>
      <ul>
        <li v-for="ingredient in cocktail.ingredients.alcohol" :key="ingredient">
          {{ ingredient }}
        </li>
        <li v-for="ingredient in cocktail.ingredients.juice" :key="ingredient">
          {{ ingredient }}
        </li>
        <li v-for="ingredient in cocktail.ingredients.other" :key="ingredient">
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
