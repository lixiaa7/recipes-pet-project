export interface IRecipeDetails {
    caloriesPerServing: number
    cookTimeMinutes: number
    id: number
    name: string
    cuisine: string
    image: string
    difficulty: string
    ingredients: string[]
    instructions: string[]
    mealType: string[]
    prepTimeMinutes: number
    rating: number
    reviewCount: number
    servings: number
    tags?: string[]
}

export interface IGroupedCuisines {
    [key: string]: IRecipeDetails[]
}
export interface IGroupedMeals {
    [key: string]: IRecipeDetails[]
}