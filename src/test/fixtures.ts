import type {IRecipeDetails} from "../types/IRecipeDetails.types.ts";
import type {RecipeForm} from "../types/RecipeForm.types.ts";

export const createRecipe = (overrides: Partial<IRecipeDetails> = {}): IRecipeDetails => ({
    caloriesPerServing: 320,
    cookTimeMinutes: 25,
    id: 1,
    name: "Tomato Pasta",
    cuisine: "Italian",
    image: "https://example.com/pasta.jpg",
    difficulty: "Easy",
    ingredients: ["Tomatoes, chopped", "Fresh basil", "Olive oil"],
    instructions: ["Boil pasta", "Mix sauce"],
    mealType: ["Dinner"],
    prepTimeMinutes: 10,
    rating: 4.5,
    reviewCount: 12,
    servings: 2,
    tags: ["quick"],
    ...overrides,
});

export const createRecipeForm = (overrides: Partial<RecipeForm> = {}): RecipeForm => ({
    ...createRecipe(),
    userId: 99,
    ...overrides,
});
