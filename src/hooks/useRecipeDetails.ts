import type {IRecipeDetails} from "../types/IRecipeDetails.types.ts";
import {useRecipes} from "./useRecipes.ts";

type RecipeDetailsResult = {
    data: IRecipeDetails | undefined;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
};

export function useRecipeDetails(id: number): RecipeDetailsResult {
    const {data: recipes, isLoading, isError, error} = useRecipes();
    const recipe = recipes.find((item) => item.id === id);

    return {
        data: recipe,
        isLoading,
        isError,
        error,
    };
}
