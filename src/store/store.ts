import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from './recipesSlice';
import modalReducer from './modalSlice';

export const store = configureStore({
    reducer: {
        modal: modalReducer,
        recipes: recipesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
