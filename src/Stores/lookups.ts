import { defineStore } from "pinia";
import { ref } from "vue";

import { crudFactory } from '@/Services/CrudFactory.ts'
import type { Lookup } from '@/Types/Lookup.ts'

export const useLookupsStore = defineStore("lookups", () => {
  const tags = ref<Lookup[]>([]);
  const allergens = ref<Lookup[]>([]);
  const difficulties = ref<Lookup[]>([]);
  const loaded = ref<boolean>(false);

  const lookupTags = crudFactory.useLookupTags();
  const lookupAllergens = crudFactory.useLookupAllergens();
  const lookupDifficulties = crudFactory.useLookupDifficulties();

  const loadAll = async () => {
    if(loaded.value) return;

    await Promise.all([
      lookupTags.getAll(),
      lookupAllergens.getAll(),
      lookupDifficulties.getAll(),
    ]);

    tags.value = lookupTags.items.value;
    allergens.value = lookupAllergens.items.value;
    difficulties.value = lookupDifficulties.items.value;
    loaded.value = true;
  }

  const refresh = async () => {
    loaded.value = false;
    await loadAll();
  }

  return {
    tags,
    allergens,
    difficulties,
    loadAll,
    refresh
  }
})