import {useQuery, type UseQueryResult} from '@tanstack/react-query';
import {fetchCuisine} from '../api/fetchCuisine.api.ts'
import type {IRecipeDetails} from "../types/IRecipeDetails.types.ts";
import {useSelector} from "react-redux";
import type {RootState} from "../store/store.ts";


export function useCuisine(cuisine: string): UseQueryResult<IRecipeDetails[], Error> {
    const recipes = useSelector((state: RootState) => state.recipes.items);

    return useQuery<IRecipeDetails[]>({
        queryKey: ['cuisine', cuisine],
        queryFn: () => fetchCuisine(cuisine),
        enabled: recipes.length === 0,
        staleTime: Infinity,
    });
}
