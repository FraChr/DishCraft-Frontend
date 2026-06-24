<script setup lang="ts">
import { crudFactory } from '@/Services/CrudFactory.ts'
import { computed, onMounted, ref, watch } from 'vue'
import RecipeCard from '@/Components/RecipeCard.vue'
import { useRoute, useRouter } from 'vue-router'
import RecipeDetails from '@/Components/RecipeDetails.vue'
import SearchBar from '@/Components/SearchBar.vue'
import Filter from '@/Components/Filter.vue'
import Popup from '@/Components/Popup.vue'
import { filterIcon } from '@/Assets/svg icons/icons.ts'
import { useLookupsStore } from '@/Stores/lookups.ts'

const router = useRouter()
const route = useRoute()
const recipes = crudFactory.useRecipe()

const lookups = useLookupsStore();

const difficultyFilter = ref<string[]>([]);
const tagFilter = ref<string[]>([]);
const allergensFilter = ref<string[]>([]);
const searchTerm = ref<string>('');

const slug = computed(() => route.params.slug as string | undefined);

const activeFilter = ref<boolean>(false);

const selectedRecipe = computed(() => {
  if (!slug.value) return null
  return recipes.items.value?.find((r) => r.slug === slug.value) || null
});

const recipeDetails = (slug: string) => {
  router.push(`/recipes/${slug}`)
}

watch([difficultyFilter, allergensFilter, tagFilter], async () => {
  await triggerSearch();
});

const handleSearch = async (value: string) => {
  searchTerm.value = value;
  console.log('searchTerm: ', searchTerm.value);
  await triggerSearch();
}

const triggerSearch = async () => {
  const params: Record<string, any> = {};

  if(searchTerm.value) params.searchTerm = searchTerm.value;
  if(difficultyFilter.value?.length) params.difficulty = difficultyFilter.value;
  if(allergensFilter.value?.length) params.allergens = allergensFilter.value;
  if(tagFilter.value?.length) params.tags = tagFilter.value;

  await recipes.getAll(params);
  await router.replace(recipes.url.value);
}


const showPopup = () => {
  activeFilter.value = !activeFilter.value
}

const navCreate = () => {
  router.push('/recipes/create')
}

onMounted(async () => {
  await recipes.getAll()
  await lookups.loadAll()
});
</script>

<template>
  <template v-if="recipes.items">
    <main v-if="!selectedRecipe">
      <SearchBar v-model="searchTerm" @search="handleSearch" />
      <button @click="showPopup">
        <span v-html="filterIcon"></span>
      </button>
      <Popup v-model:visible="activeFilter">
        <Filter
          :multiple="false"
          :filter-type="'difficulty'"
          :options="lookups.difficulties"
          v-model="difficultyFilter"
        />
        <Filter
          :multiple="true"
          :filter-type="'tags'"
          :options="lookups.tags"
          v-model="tagFilter"
        />
        <Filter
          :multiple="true"
          :filter-type="'allergens'"
          :options="lookups.allergens"
          v-model="allergensFilter"
        />
      </Popup>

      <button @click="navCreate">Add Recipe</button>

      <section class="layout">
        <RecipeCard
          @click="() => recipeDetails(r.slug)"
          v-for="r in recipes.items.value"
          :key="r.slug"
          :recipe="r"
        />
      </section>
    </main>

    <article v-else>
      <RecipeDetails :recipe="selectedRecipe" />
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