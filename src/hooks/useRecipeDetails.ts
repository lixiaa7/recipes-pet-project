import {useQuery, type UseQueryResult} from '@tanstack/react-query';
import {fetchRecipeDetails} from "../api/fetchRecipeDetails.api.ts";
import type {IRecipeDetails} from "../types/IRecipeDetails.types.ts";

export function useRecipeDetails(id: number): UseQueryResult<IRecipeDetails, Error> {

    return useQuery<IRecipeDetails>({
        queryKey: ['recipe-details'],
        queryFn: () => fetchRecipeDetails(id),
    });
}