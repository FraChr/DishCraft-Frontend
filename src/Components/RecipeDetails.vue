<script setup lang="ts">
import type { Recipe } from '@/Types/Recipe.ts'
import { useDateTimeUtils } from '@/Composables/Utils/useDateTImeUtils.ts'
import router from '@/router'

const { convertUtcToDate } = useDateTimeUtils()

defineProps<{
  recipe: Recipe
}>()

const goBack = () => {
  router.push('/recipes')
}
</script>

<template>
  <article>
    <h1>Name: {{ recipe.name }}</h1>
    <p>Created at: {{ convertUtcToDate(recipe.createdAt) }}</p>
    <p>Created by: {{ recipe.createdBy }}</p>
    <p>Difficulty: {{ recipe.difficulty }}</p>

    <section>
      <h2>Ingredients</h2>
      <ul class="detailed-list-style">
        <li v-for="ingredients in recipe.ingredients" :key="recipe.slug">
          {{ ingredients.ingredient }}: {{ ingredients.amount }} {{ ingredients.unit }}
        </li>
      </ul>
    </section>

    <section>
      <h2>Instructions</h2>
      <ol class="detailed-list-style">
        <li v-for="instruction in recipe.instructions" :key="instruction.stepNumber">
          <strong>{{ instruction.stepNumber }}.</strong> {{ instruction.text }}
        </li>
      </ol>
    </section>
  </article>
</template>

<style scoped>
.detailed-list-style {
  list-style: none;
}

.detailed-list-style li {
  padding: 0.3rem;
}
</style>