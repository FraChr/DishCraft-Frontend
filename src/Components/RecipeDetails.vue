<script setup lang="ts">
  import type { Recipe } from '@/Types/Recipe.ts'

  defineProps<{
      recipe: Recipe;
  }>();

</script>

<template>

  <p>Name: {{recipe.name}}</p>
  <p>Created at: {{recipe.createdAt}}</p>
  <p>Created by: {{recipe.createdBy}}</p>
  <p>Difficulty: {{recipe.difficulty}}</p>
  <ol>
    <li v-for="instruction in recipe.instructions" :key="instruction.stepNumber">
      {{instruction.text}}
    </li>
  </ol>
</template>

<style scoped>

</style>