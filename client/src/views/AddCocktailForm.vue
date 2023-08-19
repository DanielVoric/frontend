<!--Forma-->
<template>
  <div class="container mt-4">
    <h1>Add a New Cocktail</h1>
    <form @submit.prevent="submitCocktailForm" class="mt-3">
      <label for="name" class="form-label">Cocktail Name:</label>
      <input type="text" v-model="name" id="name" class="form-control" required />

      <!--Alcohol  -->
      <h2>Alcohol:</h2>
      <div v-for="(alc, index) in alcohols" :key="index" class="mb-2">
        <input type="text" v-model="alc.value" class="form-control" />
        <button @click.prevent="removeAlcohol(index)" class="btn btn-danger mt-1">Remove</button>
      </div>
      <button @click.prevent="addAlcohol" class="btn btn-info">Add Another Alcohol</button>

      <!--Juice -->
      <h2>Juice:</h2>
      <div v-for="(ju, index) in juices" :key="index" class="mb-2">
        <input type="text" v-model="ju.value" class="form-control" />
        <button @click.prevent="removeJuice(index)" class="btn btn-danger mt-1">Remove</button>
      </div>
      <button @click.prevent="addJuice" class="btn btn-info">Add Another Juice</button>

      <!--Other -->
      <h2>Other:</h2>
      <div v-for="(ot, index) in others" :key="index" class="mb-2">
        <input type="text" v-model="ot.value" class="form-control" />
        <button @click.prevent="removeOther(index)" class="btn btn-danger mt-1">Remove</button>
      </div>
      <button @click.prevent="addOther" class="btn btn-info">Add Another Other Ingredient</button>

      <button type="submit" class="btn btn-success mt-3">Submit</button>
    </form>
  </div>
</template>

  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        name: "",
        alcohols: [{ value: "" }],
        juices: [{ value: "" }],
        others: [{ value: "" }]
      };
    },
    methods: {
      addAlcohol() {
        this.alcohols.push({ value: "" });
      },
      removeAlcohol(index) {
        this.alcohols.splice(index, 1);
      },
      addJuice() {
        this.juices.push({ value: "" });
      },
      removeJuice(index) {
        this.juices.splice(index, 1);
      },
      addOther() {
        this.others.push({ value: "" });
      },
      removeOther(index) {
        this.others.splice(index, 1);
      },
      async submitCocktailForm() {
        try {
          const response = await axios.post('http://localhost:5000/cocktails', {
            name: this.name,
            ingredients: {
              alcohol: this.alcohols.map(a => a.value),
              juice: this.juices.map(j => j.value),
              other: this.others.map(o => o.value)
            }
          });
  
          if (response.status === 201) {
            alert('Cocktail added successfully!');
            this.$router.push('/');
          }
        } catch (error) {
          alert('Failed to add the cocktail. Please try again.');
        }
      }
    }
  };
  </script>
  