export interface Recipe {
  slug: string;
  name: string;
  createdBy: string;
  createdAt: string;
  difficulty: string;
  instructions: RecipeSteps[];
  tags: RecipeTags[];
  ingredients: [];
  allergens: RecipeAllergens[];
}

interface RecipeSteps {
  stepNumber: number;
  text: string;
}

interface RecipeTags {
  name: string;
}

interface RecipeAllergens {
  name: string;
}