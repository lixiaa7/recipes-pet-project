import {addRecipe} from "../store/recipesSlice.ts";
import {useMutation} from "@tanstack/react-query";
import {useDispatch} from "react-redux";
import {createRecipe} from "../api/createRecipe.api.ts";
import type {RecipeForm} from "../types/RecipeForm.types.ts";

export function useAddRecipe() {
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: createRecipe,
        onSuccess: (_data, newRecipe: RecipeForm) => {
            dispatch(addRecipe(newRecipe));
        },
    });
}

