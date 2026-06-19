<script setup lang="ts">
import {useRouter} from 'vue-router';

const router = useRouter();

  const navRecipes = () => {
    router.push('/recipes');
  }

</script>

<template>
  <!--  <Header />-->
  <div class="home">
    <div class="home-item">
      <h1>TESTING 1</h1>
    </div>
    <div class="home-item">
      <h1>TESTING 2</h1>
    </div>
    <div class="home-item">
      <h1>TESTING 3</h1>
    </div>
    <div class="home-item">
      <h1>TESTING 4</h1>
    </div>
    <div class="home-item">
      <h1>TESTING 5</h1>
    </div>
  </div>

  <button @click="navRecipes">Recipes</button>
</template>

<style scoped>
  .home {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.3rem;
  }
  .home-item {
    background: blueviolet;
  }
</style>
