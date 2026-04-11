export type RecipeForm = {
    name: string;
    difficulty: "easy" | "medium" | "hard";
    cookTimeMinutes: number;
    image: string;
    mealType: string[];
    ingredients: string[];
    servings: number;
    cuisine: string;
    caloriesPerServing: number;
    instructions: string[];
    id: number;
    userId: number;
    rating: number;
    reviewCount: number;
};