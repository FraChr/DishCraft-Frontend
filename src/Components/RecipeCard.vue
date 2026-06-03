<script setup lang="ts">
  import type { Recipe } from '@/Types/Recipe.ts'

  defineProps<{
    recipe: Recipe;
  }>();
  
  const emit = defineEmits(['click'])
</script>

<template>
  <article
    class="card"
    @click="emit('click')"
    tabindex="0"
    @keydown.enter="emit('click')"
    @keydown.space.prevent="emit('click')"
    aria-label="Recipe: {{ recipe.name }}"
  >
    <header class="card-header">
      <h2>{{ recipe.name }}</h2>
    </header>

    <section>
    <dl>
      <div class="info-item">
        <dt>Difficulty</dt>
        <dd>{{ recipe.difficulty }}</dd>
      </div>

      <div class="info-item">
        <dt>Allergens</dt>
        <dd>
          <ul>
            <li v-for="allergen in recipe.allergens" :key="recipe.slug">
              {{allergen}}
            </li>
          </ul>
        </dd>
      </div>
    </dl>
    </section>
  </article>
</template>

<style scoped>
  .info-item {
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
  }

  .info-item dd {
    margin: 0;
    text-align: right;
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