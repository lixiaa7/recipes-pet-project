import {useQuery, type UseQueryResult} from '@tanstack/react-query';
import {fetchRecipes} from "../api/fetchRecipes.api.ts";
import type {IRecipeDetails} from "../types/IRecipeDetails.types.ts";
import {useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";

export function useRecipes(): UseQueryResult<IRecipeDetails[], Error> {
    const recipes = useSelector((state: RootState) => state.recipes.items);
    return useQuery<IRecipeDetails[]>({
        queryKey: ['recipes'],
        queryFn: fetchRecipes,
        enabled: recipes.length === 0,
        staleTime: Infinity,
    });
}