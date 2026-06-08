import {createCrudService} from '@/Services/Api.ts'
import { ref } from 'vue'
import type {Recipe} from '@/Types/Recipe.ts'

export function useCrud<T>(route: string) {

  const service = createCrudService(route);

  const item = ref<T | null>(null);
  const items = ref<T[]>([]);

  const getAll = async (params: Record<string, any> = {}) => {
    try {
      /*console.log('Params recived:', params);
      console.log('Params entries:', Object.entries(params));*/

      const response = await service.getList(params);
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