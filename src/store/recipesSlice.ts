import {createSlice, type PayloadAction} from '@reduxjs/toolkit';
import type {IRecipeDetails} from "../types/IRecipeDetails.types.ts";

interface RecipesState {
    items: IRecipeDetails[];
    hasHydrated: boolean;
}

const getNextAvailableRecipeId = (recipes: IRecipeDetails[]) => {
    const maxId = recipes.reduce((currentMax, recipe) => Math.max(currentMax, recipe.id), 0);
    return maxId + 1;
};

const initialState: RecipesState = {
    items: [],
    hasHydrated: false,
};

const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        hydrateRecipes(state, action: PayloadAction<IRecipeDetails[]>) {
            if (state.hasHydrated) {
                return;
            }

            const mergedRecipes = [...action.payload];

            state.items.forEach((recipe) => {
                const existingRecipeIndex = mergedRecipes.findIndex((item) => item.id === recipe.id);

                if (existingRecipeIndex === -1) {
                    mergedRecipes.push(recipe);
                    return;
                }

                mergedRecipes[existingRecipeIndex] = recipe;
            });

            state.items = mergedRecipes;
            state.hasHydrated = true;
        },
        addRecipe(state, action: PayloadAction<IRecipeDetails>) {
            const hasSameId = state.items.some((item) => item.id === action.payload.id);

            state.items.push(
                hasSameId
                    ? {
                        ...action.payload,
                        id: getNextAvailableRecipeId(state.items),
                    }
                    : action.payload,
            );
        },
        deleteRecipe(state, action: PayloadAction<number>) {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
    },
});

export const {hydrateRecipes, addRecipe, deleteRecipe} = recipesSlice.actions;
export default recipesSlice.reducer;
