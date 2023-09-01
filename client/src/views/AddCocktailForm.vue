<!--Forma-->
<template>
  <div id="addCocktailPage" class="container1 mt-41">
    <div class="blurry-box1">
      <h1 class="title2">Add a New Custom Cocktail</h1>
      <form @submit.prevent="submitCocktailForm" class="mt-3">
        <label for="name" class="form-label">Cocktail Name:</label>
        <input
          type="text"
          v-model="name"
          id="name"
          class="form-control cocktail-name-input1"
          required
        />

        <!--Alcohol -->
        <h2>Alcohol:</h2>
        <div
          v-for="(alc, index) in alcohols"
          :key="index"
          class="input-group1 mb-2"
        >
          <input
            type="text"
            v-model="alc.value"
            class="form-control alcohol-input1"
          />
          <button
            @click.prevent="removeAlcohol(index)"
            class="btn btn-danger input-group-append1"
          >
            Remove
          </button>
        </div>
        <button @click.prevent="addAlcohol" class="btn btn-info1">
          Add another Alcohol
        </button>

        <!--Juice -->
        <h2>Juice:</h2>
        <div
          v-for="(ju, index) in juices"
          :key="index"
          class="input-group1 mb-2"
        >
          <input
            type="text"
            v-model="ju.value"
            class="form-control juice-input1"
          />
          <button
            @click.prevent="removeJuice(index)"
            class="btn btn-danger input-group-append1"
          >
            Remove
          </button>
        </div>
        <button @click.prevent="addJuice" class="btn btn-pink1">
          Add another Juice
        </button>

        <!--Other -->
        <h2>Other:</h2>
        <div
          v-for="(ot, index) in others"
          :key="index"
          class="input-group1 mb-2"
        >
          <input
            type="text"
            v-model="ot.value"
            class="form-control other-input1"
          />
          <button
            @click.prevent="removeOther(index)"
            class="btn btn-danger input-group-append1"
          >
            Remove
          </button>
        </div>
        <button @click.prevent="addOther" class="btn btn-lightyellow1">
          Add another Other ingredient
        </button>

        <button type="submit" class="btn btn-success mt-3 submit-button1">
          Finish adding custom Cocktail
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      alcohols: [{ value: "" }],
      juices: [{ value: "" }],
      others: [{ value: "" }],
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
        const response = await axios.post("http://https://koktelomat.onrender.com/cocktails", {
          name: this.name,
          ingredients: {
            alcohol: this.alcohols.map((a) => a.value).filter(Boolean),
            juice: this.juices.map((j) => j.value).filter(Boolean),
            other: this.others.map((o) => o.value).filter(Boolean),
          },
        });

        if (response.status === 201) {
          alert("Cocktail added successfully!");
          this.$router.push("/");
        }
      } catch (error) {
        alert("Failed to add the cocktail. Please try again.");
      }
    },
  },
};
</script>
<style scoped></style>
