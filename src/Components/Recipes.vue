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

const router = useRouter()
const route = useRoute()
const recipes = crudFactory.useRecipe()

const lookupTags = crudFactory.useLookupTags()
const lookupAllergens = crudFactory.useLookupAllergens()
const lookupDifficulties = crudFactory.useLookupDifficulties()

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

watch([difficultyFilter, allergensFilter, tagFilter], async (values) => {
  /*const [difficulty, allergen, tags] = values*/

  /*const params: Record<string, any> = {}

  if (difficulty && difficulty.length > 0) params.difficulty = difficulty[0];

  if (allergen && allergen.length > 0) params.allergens = allergen;

  if (tags && tags.length > 0) params.tags = tags;

  await recipes.getAll(params)

  await router.replace(recipes.url.value)*/
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

onMounted(async () => {
  await recipes.getAll()
  await lookupTags.getAll()
  await lookupAllergens.getAll()
  await lookupDifficulties.getAll()
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
          :options="lookupDifficulties.items.value"
          v-model="difficultyFilter"
        />
        <Filter
          :multiple="true"
          :filter-type="'tags'"
          :options="lookupTags.items.value"
          v-model="tagFilter"
        />
        <Filter
          :multiple="true"
          :filter-type="'allergens'"
          :options="lookupAllergens.items.value"
          v-model="allergensFilter"
        />
      </Popup>
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