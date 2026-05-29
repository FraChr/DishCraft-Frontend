import axios from 'axios'
import router from '@/router'

const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  }
});

export const createCrudService = (route: string) => ({
  list: (params: Record<string, any>) => apiClient.get(`/${route}`, params),
  getBySlug: (slug: string) => apiClient.get(`/${route}/${slug}`),
});