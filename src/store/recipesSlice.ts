import { createSlice } from '@reduxjs/toolkit';

interface Recipe {
    id: number;
    name: string;
}

interface RecipesState {
    items: Recipe[];
}

const initialState: RecipesState = {
    items: [],
};

const recipesSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        setRecipes(state, action) {
            state.items = action.payload;
        },
        addRecipe(state, action) {
            state.items.push(action.payload);
        },
        deleteRecipe(state, action) {
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        // updateRecipe(state, action) {
        //     const index = state.items.findIndex(item => item.id === action.payload.id);
        //     if (index !== -1) {
        //         state.items[index] = action.payload;
        //     }
        // },
    },
});

export const { setRecipes, addRecipe, deleteRecipe } = recipesSlice.actions;
export default recipesSlice.reducer;