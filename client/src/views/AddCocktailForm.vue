<!--Forma-->>
<template>
    <div>
      <h1>Add a New Cocktail</h1>
      <form @submit.prevent="submitCocktailForm">
        <label for="name">Cocktail Name:</label>
        <input type="text" v-model="name" id="name" required />
  
        <!--Alkohol  -->
        <h2>Alcohol:</h2>
        <div v-for="(alc, index) in alcohols" :key="index">
          <input type="text" v-model="alc.value" />
          <button @click.prevent="removeAlcohol(index)">Remove</button>
        </div>
        <button @click.prevent="addAlcohol">Add Another Alcohol</button>
  
        <!--Juice -->
        <h2>Juice:</h2>
        <div v-for="(ju, index) in juices" :key="index">
          <input type="text" v-model="ju.value" />
          <button @click.prevent="removeJuice(index)">Remove</button>
        </div>
        <button @click.prevent="addJuice">Add Another Juice</button>
  
        <!--Other -->
        <h2>Other:</h2>
        <div v-for="(ot, index) in others" :key="index">
          <input type="text" v-model="ot.value" />
          <button @click.prevent="removeOther(index)">Remove</button>
        </div>
        <button @click.prevent="addOther">Add Another Other Ingredient</button>
  
        <button type="submit">Submit</button>
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
  