<script setup lang="ts">
  import type { Recipe } from '@/Types/Recipe.ts'

  defineProps<{
    recipe: Recipe;
  }>();
</script>

<template>
  <div class="card">
    <h2 class="card-header">{{ recipe.name }}</h2>
<!--    <p>
      Difficulty:
      {{ recipe.difficulty }}
    </p>-->
<!--    <ul>
      <li v-for="tag in recipe.tags" :key="recipe.slug">
        {{tag}}
      </li>
    </ul>-->

    <dl>
      <div class="info-item">
        <dt>Difficulty</dt>
        <dd>{{ recipe.difficulty }}</dd>
      </div>
      <div class="info-item">
<!--        <dt>Tags</dt>-->
        <dt>Allergens</dt>
        <dd>
          <ul>
<!--            <li v-for="tag in recipe.tags" :key="recipe.slug">
              {{tag}}
            </li>-->
            <li v-for="allergen in recipe.allergens" :key="recipe.slug">
              {{allergen}}
            </li>
          </ul>
        </dd>
      </div>
    </dl>
  </div>
</template>

<style scoped>
  .info-item {
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
  }
  .card-header {
    display: flex;
    justify-content: center;
  }
  .card {
    border: 0.5rem solid blue;
    border-radius: 1.5rem;
    padding: 1rem;
  }
  ul {
    list-style-type: none;
  }
</style>