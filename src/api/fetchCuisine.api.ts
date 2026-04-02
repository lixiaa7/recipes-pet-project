import type {IRecipeDetails} from "../types/IRecipeDetails.types.ts";

export async function fetchCuisine(typeCuisine: string): Promise<IRecipeDetails[]> {

    const searchedCuisine = typeCuisine[0].toUpperCase() + typeCuisine.slice(1);

    const res = await fetch(`https://dummyjson.com/recipes/tag/${searchedCuisine}`);

    if (!res.ok) {
        throw new Error('Failed to fetch cuisine!');
    }

    const data = await res.json();

    return data?.recipes as IRecipeDetails[];
}
