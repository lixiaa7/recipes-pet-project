import type {IRecipeDetails} from "../types/IRecipeDetails.types.ts";


export async function fetchRecipeDetails(id: number): Promise<IRecipeDetails> {
    const res = await fetch(`https://dummyjson.com/recipes/${id}`);

    if (!res.ok) {
        throw new Error('Failed to fetch recipes');
    }

    const data = await res.json();

    return data as IRecipeDetails;
}