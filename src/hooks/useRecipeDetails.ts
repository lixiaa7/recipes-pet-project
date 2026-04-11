import {useQuery, type UseQueryResult} from '@tanstack/react-query';
import {fetchRecipeDetails} from "../api/fetchRecipeDetails.api.ts";
import type {IRecipeDetails} from "../types/IRecipeDetails.types.ts";
// import {useSelector} from "react-redux";
// import type {RootState} from "../store/store.ts";

export function useRecipeDetails(id: number): UseQueryResult<IRecipeDetails, Error> {
    // const recipes = useSelector((state: RootState) => state.recipes.items);

    return useQuery<IRecipeDetails>({
        queryKey: ['recipe-details'],
        queryFn: () => fetchRecipeDetails(id),
        // enabled: recipes.length === 0,
        // staleTime: Infinity,
    });
}