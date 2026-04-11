import type {RecipeForm} from "../types/RecipeForm.types.ts";

export async function createRecipe(recipe: RecipeForm) {
    const response = await fetch('https://dummyjson.com/recipes/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
    });

    if (!response.ok) {
        throw new Error('Failed to create recipe');
    }

    return response.json();

}