import { useCrud } from '@/Composables/useCrud.ts'
import type { Recipe } from '@/Types/Recipe.ts'
import type { Lookup } from '@/Types/Lookup.ts'

export const crudFactory = {
  useRecipe: () => useCrud<Recipe>('recipes'),
  useLookupTags: () => useCrud<Lookup>('lookup/tags'),
  useLookupDifficulties: () => useCrud<Lookup>('lookup/difficulties'),
  useLookupAllergens: () => useCrud<Lookup>('lookup/allergens'),
}
