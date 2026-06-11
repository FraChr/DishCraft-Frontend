export interface Recipe {
  slug: string
  name: string
  createdBy: string
  createdAt: string
  difficulty: string
  instructions: RecipeSteps[]
  tags: RecipeTags[]
  ingredients: RecipeIngredients[]
  allergens: RecipeAllergens[]
}

interface RecipeIngredients {
  ingredient: string
  amount: number
  unit: string
}

interface RecipeSteps {
  stepNumber: number
  text: string
}

interface RecipeTags {
  name: string
}

interface RecipeAllergens {
  name: string
}
