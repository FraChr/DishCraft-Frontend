<script setup lang="ts">
  import { crudFactory } from '@/Services/CrudFactory.ts'
  import { computed, onMounted, ref, watch } from 'vue'
  import RecipeCard from '@/Components/RecipeCard.vue'
  import { useRoute, useRouter } from 'vue-router'
  import RecipeDetails from '@/Components/RecipeDetails.vue'
  import SearchBar from '@/Components/SearchBar.vue'
  import Filter from '@/Components/Filter.vue'
  import Popup from '@/Components/Popup.vue'

  const router = useRouter();
  const route = useRoute();
  const recipes = crudFactory.useRecipe();

  const lookupTags = crudFactory.useLookupTags();
  const lookupAllergens = crudFactory.useLookupAllergens();
  const lookupDifficulties = crudFactory.useLookupDifficulties();

  const difficultyFilter = ref<string[]>([]);
  const tagFilter = ref<string[]>([]);
  const allergensFilter = ref<string[]>([]);

  const slug = computed(() => route.params.slug as string | undefined)

  const selectedRecipe = computed(() => {
    if (!slug.value) return null
    return recipes.items.value?.find(r => r.slug === slug.value) || null
  });

  const recipeDetails = (slug: string) => {
    router.push(`/recipes/${slug}`);
  }

  watch(
    [difficultyFilter, allergensFilter, tagFilter],
    async (values) => {
      const [difficulty, allergen, tags] = values;


      const params: Record<string, any> = {};

      if(difficulty && difficulty.length > 0)
        params.difficulty = difficulty[0];

      if(allergen && allergen.length > 0)
        params.allergen = allergen[0];

      if(tags && tags.length > 0)
        params.tags = tags.join(',');

      console.log('All filters:', params);
      await recipes.getAll(params);
    });

  const show = ref(false);

  const showPopup = () => {
    show.value = !show.value;
    console.log(show.value);
  }

  onMounted(async () => {
    await recipes.getAll();
    await lookupTags.getAll();
    await lookupAllergens.getAll();
    await lookupDifficulties.getAll();
  });
</script>

<template>
  <template  v-if="recipes.items">
    <main v-if="!selectedRecipe" >
      <SearchBar />
      <button @click="showPopup">show</button>
      <Popup v-model:visible="show">
        <Filter :multiple="false" :filter-type="'difficulty'" :options="lookupDifficulties.items.value" v-model="difficultyFilter"/>
        <Filter :multiple="true" :filter-type="'tags'" :options="lookupTags.items.value" v-model="tagFilter"/>
        <Filter :multiple="false" :filter-type="'allergens'" :options="lookupAllergens.items.value" v-model="allergensFilter"/>
      </Popup>
<!--      <Filter :show="show" :options="lookupTags.items.value" v-model="tagFilter"/>
      <Filter :show="show" :options="lookupAllergens.items.value" v-model="allergensFilter"/>-->
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