import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/Views/HomeView.vue'
import RecipeView from '@/Views/RecipeView.vue'
import CreateRecipe from '@/Components/createRecipe.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      name: 'HomeView',
      path: '/',
      component: HomeView,
    },
    {
      name: 'RecipeView',
      path: '/recipes',
      component: RecipeView,
    },
    {
      name: 'recipe',
      path: '/recipes/:slug?',
      component: RecipeView,
    },
    {
     name: 'create',
     path: '/recipes/create',
     component: CreateRecipe,
    }
  ],
})

export default router
