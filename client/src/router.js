import { createRouter, createWebHistory } from 'vue-router'; 
import AddCocktailForm from './views/AddCocktailForm.vue';
import Home from './views/Home.vue';
import AllCocktails from './views/AllCocktails.vue';

//rute
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
    component: AllCocktails
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
