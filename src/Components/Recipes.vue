<script setup lang="ts">
  import { crudFactory } from '@/Services/CrudFactory.ts'
  import { computed, onMounted } from 'vue'
  import RecipeCard from '@/Components/RecipeCard.vue'
  import { useRoute, useRouter } from 'vue-router'
  import RecipeDetails from '@/Components/RecipeDetails.vue'
  import SearchBar from '@/Components/SearchBar.vue'

  const router = useRouter();
  const route = useRoute();
  const recipes = crudFactory.useRecipe();

  const slug = computed(() => route.params.slug as string | undefined)

  const selectedRecipe = computed(() => {
    if (!slug.value) return null
    return recipes.items.value?.find(r => r.slug === slug.value) || null
  });

  const recipeDetails = (slug: string) => {
    router.push(`/recipes/${slug}`);
  }

  onMounted(async () => {
    await recipes.getAll();
  });
</script>

<template>
  <template  v-if="recipes.items">
    <main v-if="!selectedRecipe" >
      <SearchBar />
      <section class="layout">
        <RecipeCard @click="() => recipeDetails(r.slug)" v-for="r in recipes.items.value"
                    :key="r.slug"
                    :recipe="r"/>
      </section>
    </main>

    <article v-else>
      <RecipeDetails :recipe="selectedRecipe"/>
    </article>
  </template>
</template>

<style scoped>
  .layout {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(max(300px, 20vw), 1fr));
    gap: 1rem;
    container-type: inline-size;
  }
  @media (min-width: 1249px) {
    .layout {
      grid-template-columns: repeat(4, 1fr);
    }

  }
</style>