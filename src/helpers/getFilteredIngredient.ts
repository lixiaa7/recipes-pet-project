import type {IRecipeDetails} from "../types/IRecipeDetails.types.ts";
import {ingredientToSlug, normalizeIngredientName} from "./ingredientsCatalog.ts";

export const getFilteredIngredient = (data : IRecipeDetails[] | undefined, searchedIngredient: string)  => {
   if (!data || !searchedIngredient) return

    const normalizedSearch = ingredientToSlug(searchedIngredient);

    const filteredIngredient = data.filter((recipe) =>
        recipe.ingredients.some((ingredient) =>
            ingredientToSlug(ingredient) === normalizedSearch ||
            normalizeIngredientName(ingredient).toLowerCase().includes(searchedIngredient.toLowerCase())
        )
    );

    return filteredIngredient;
}
