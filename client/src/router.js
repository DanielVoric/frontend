import { createRouter, createWebHistory } from 'vue-router';
import AddCocktailForm from './views/AddCocktailForm.vue';
import Home from './views/Home.vue';
import AllCocktails from './views/AllCocktails.vue';
import UserLogin from "@/components/UserLogin.vue";
import UserRegistration from "@/components/UserRegistration.vue";

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
  },
  {
    path: '/login',
    name: 'Login',
    component: UserLogin
  },
  {
    path: '/register',
    name: 'Register',
    component: UserRegistration
  }

];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
