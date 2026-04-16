import type {RecipeForm} from "../types/RecipeForm.types.ts";

const createTemporaryId = () => Date.now() + Math.floor(Math.random() * 1_000_000);

export const createInitialRecipeForm = (): RecipeForm => ({
    name: "",
    difficulty: "medium",
    cookTimeMinutes: 20,
    prepTimeMinutes: 10,
    image: "",
    mealType: [],
    ingredients: [],
    instructions: [],
    servings: 2,
    cuisine: "Asian",
    caloriesPerServing: 250,
    id: createTemporaryId(),
    userId: createTemporaryId(),
    rating: +(Math.random() + 4).toFixed(1),
    reviewCount: Math.floor(Math.random() * 1000),
});
