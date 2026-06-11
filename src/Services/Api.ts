import axios from 'axios'
import router from '@/router'

const apiClient = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use((config) => {
  console.log(`[${config.method?.toUpperCase()}] ${config.url}`)
  console.log('Params:', config.params)
  console.log(
    'Full URL:',
    config.url + (config.params ? `?${new URLSearchParams(config.params).toString()}` : ''),
  )

  return config
});

export const createCrudService = (route: string) => ({
  getList: (params: Record<string, any> = {}) => apiClient.get(`/${route}`, { params }),
  getBySlug: (slug: string) => apiClient.get(`/${route}/${slug}`),
});
