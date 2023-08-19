// No need to import Vue here in Vue 3.
import { createRouter, createWebHistory } from 'vue-router'; // Vue Router 4 syntax
import AddCocktailForm from './views/AddCocktailForm.vue';
import Home from './views/Home.vue';
import AllCocktails from './views/AllCocktails.vue'; // Import the new component

// Define the routes
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/add',
    name: 'addCocktail',
    component: AddCocktailForm
  },
  {
    path: '/all-cocktails',
    name: 'all-cocktails',
    component: AllCocktails  // New route for listing all cocktails
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
