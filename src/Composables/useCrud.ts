import {createCrudService} from '@/Services/Api.ts'
import { ref } from 'vue'
import type {Recipe} from '@/Types/Recipe.ts'

export function useCrud(route: string) {

  const service = createCrudService(route);

  const item = ref<Recipe | null>(null);
  const items = ref<Recipe[]>([]);

  const getAll = async () => {
    try {
      const response = await service.list({

      });
      items.value = response.data;

    } catch (error) {
      console.error(`Error fetching data ${error}`);
    }
  }

  const getSingle = async (slug: string) => {
    try{
      const response = await service.getBySlug(slug);
      item.value = response.data;
    } catch(error) {
      console.error(`Error fetching item: ${error}`);
    }
  };



  return {
    item,
    items,
    getSingle,
    getAll,
  }

}