import {useQuery, type UseQueryResult} from '@tanstack/react-query';
import {fetchCuisine} from '../api/fetchCuisine.api.ts'
import type {IRecipeDetails} from "../types/IRecipeDetails.types.ts";


export function useCuisine(cuisine: string): UseQueryResult<IRecipeDetails[], Error> {

    return useQuery<IRecipeDetails[]>({
        queryKey: ['cuisine', cuisine],
        queryFn: () => fetchCuisine(cuisine),
        enabled: Boolean(cuisine),
    });
}
