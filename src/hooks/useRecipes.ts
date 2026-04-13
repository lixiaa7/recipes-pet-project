import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useQuery} from '@tanstack/react-query';
import {fetchRecipes} from "../api/fetchRecipes.api.ts";
import type {IRecipeDetails} from "../types/IRecipeDetails.types.ts";
import type {RootState} from "../store/store.ts";
import {hydrateRecipes} from "../store/recipesSlice.ts";

type RecipesResult = {
    data: IRecipeDetails[];
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
};

export function useRecipes(): RecipesResult {
    const dispatch = useDispatch();
    const {items: recipes, hasHydrated} = useSelector((state: RootState) => state.recipes);
    const query = useQuery<IRecipeDetails[], Error>({
        queryKey: ['recipes'],
        queryFn: fetchRecipes,
        enabled: !hasHydrated,
        staleTime: Infinity,
    });

    useEffect(() => {
        if (!hasHydrated && query.data) {
            dispatch(hydrateRecipes(query.data));
        }
    }, [dispatch, hasHydrated, query.data]);

    const hasRecipes = recipes.length > 0;

    return {
        data: recipes,
        isLoading: !hasRecipes && !hasHydrated && query.isLoading,
        isError: !hasRecipes && query.isError,
        error: hasRecipes ? null : query.error,
    };
}
