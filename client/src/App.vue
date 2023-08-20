<template>
  <div id="app">
   <nav class="navbar navbar-expand-lg navbar-light bg-light">
     <a class="navbar-brand" href="#">Cocktails</a>
     <div class="navbar-nav">
       <router-link to="/" class="nav-item nav-link">Home</router-link>
       <router-link to="/add" class="nav-item nav-link">Add Cocktail</router-link>
       <router-link to="/all-cocktails" class="btn btn-link nav-item nav-link">List All Cocktails</router-link>
     </div>
   </nav>

   <router-view></router-view>
  </div>
</template>

