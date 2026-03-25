import {useQuery} from '@tanstack/react-query';
import {fetchRecipes} from "../api/recipes.api.ts";

export function useRecipes() {
    return useQuery({
        queryKey: ['recipes'],
        queryFn: fetchRecipes,
    });
}