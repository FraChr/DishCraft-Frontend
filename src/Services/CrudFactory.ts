import { useCrud } from '@/Composables/useCrud.ts'

export const crudFactory = {
  useRecipe: () => useCrud('recipes'),
};