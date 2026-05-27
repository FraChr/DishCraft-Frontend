import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/Views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:
    [
      {
        name: 'HomeView',
        path: "/",
        component: HomeView,
      }
  ],
});



export default router
