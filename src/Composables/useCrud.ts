import { createCrudService } from '@/Services/Api.ts'
import { ref } from 'vue'
import type { Recipe } from '@/Types/Recipe.ts'

export function useCrud<T>(route: string) {
  const service = createCrudService(route)

  const item = ref<T | null>(null)
  const items = ref<T[]>([])
  const url = ref<string>('')

  const getAll = async (params: Record<string, any> = {}) => {
    try {
      const queryString = new URLSearchParams(params).toString()
      url.value = queryString ? `${route}?${queryString}` : route

      const response = await service.getList(params)
      items.value = response.data
    } catch (error) {
      console.error(`Error fetching data ${error}`)
    }
  }

  const getSingle = async (slug: string) => {
    try {
      const response = await service.getBySlug(slug)
      item.value = response.data
    } catch (error) {
      console.error(`Error fetching item: ${error}`)
    }
  }

  return {
    item,
    items,
    url,
    getSingle,
    getAll,
  }
}
