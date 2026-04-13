import {useMemo} from "react";
import type {IRecipeDetails} from "../types/IRecipeDetails.types.ts";
import {useRecipes} from "./useRecipes.ts";

type CuisineResult = {
    data: IRecipeDetails[];
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
};

export function useCuisine(cuisine: string): CuisineResult {
    const {data: recipes, isLoading, isError, error} = useRecipes();

    const filteredRecipes = useMemo(() => {
        const normalizedCuisine = cuisine.trim().toLowerCase();

        if (!normalizedCuisine) {
            return [];
        }

        return recipes.filter((recipe) => recipe.cuisine.toLowerCase() === normalizedCuisine);
    }, [recipes, cuisine]);

    return {
        data: filteredRecipes,
        isLoading,
        isError,
        error,
    };
}
