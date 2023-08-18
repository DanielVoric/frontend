// No need to import Vue here in Vue 3.
import { createRouter, createWebHistory } from 'vue-router'; // Vue Router 4 syntax
import App from './App.vue';
import AddCocktailForm from './views/AddCocktailForm.vue';

// Define the routes
const routes = [
  {
    path: '/',
    name: 'home',
    component: App
  },
  {
    path: '/add',
    name: 'addCocktail',
    component: AddCocktailForm
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
