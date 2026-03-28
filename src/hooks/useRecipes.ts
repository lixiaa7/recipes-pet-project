import {useQuery, type UseQueryResult} from '@tanstack/react-query';
import {fetchRecipes} from "../api/fetchRecipes.api.ts";
import type {IRecipeDetails} from "../types/IRecipeDetails.types.ts";

export function useRecipes(): UseQueryResult<IRecipeDetails[], Error> {
    return useQuery<IRecipeDetails[]>({
        queryKey: ['recipes'],
        queryFn: fetchRecipes,
    });
}