import {StrictMode} from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {Provider} from 'react-redux';
import {HelmetProvider} from 'react-helmet-async';

import Recipes from './routes/recipes/Recipes.tsx'
import MealsPage from './routes/meals/Meals.tsx'
import IngredientsPage from './routes/ingredients/Ingredients.tsx'
import CuisinesPage from "./routes/cuisines/Cuisines.tsx";
import RecipeDetailsPage from "./routes/recipes/RecipeDetails.tsx";

import './index.css'
import App from './App.tsx'
import CuisinesByCategory from './routes/cuisines/./CuisinesByCategory.tsx'
import IngredientsByCategoryPage from "./routes/ingredients/IngredientsByCategory.tsx";
import MealsByCategoryPage from "./routes/meals/MealsByCategory.tsx";
import {store} from "./store/store.ts"
import ErrorPage from "./routes/ErrorPage.tsx";


const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage/>,
        children: [
            {index: true, element: <Recipes/>, handle: { title: 'Recipes' }},
            {
                path: 'recipes',
                children: [
                    {path: ':id', element: <RecipeDetailsPage/>},
                ]
            },
            {
                path: 'meals',
                children: [
                    {index: true, element: <MealsPage/>, handle: { title: 'Meals' }},
                    {path: ':mealType', element: <MealsByCategoryPage/>},
                ]
            },
            {
                path: 'ingredients',
                children: [
                    {index: true, element: <IngredientsPage/>, handle: { title: 'Ingredients' }},
                    {path: ':ingredient', element: <IngredientsByCategoryPage/>},
                ]
            },
            {
                path: 'cuisines',
                children: [
                    {index: true, element: <CuisinesPage/>, handle: { title: 'Cuisines' }},
                    {path: ':cuisine', element: <CuisinesByCategory category="cuisine"/>},
                ]
            },
        ],
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <HelmetProvider>
            <Provider store={store}>
                <QueryClientProvider client={queryClient}>
                    <RouterProvider router={router}></RouterProvider>
                </QueryClientProvider>
            </Provider>
        </HelmetProvider>
    </StrictMode>,
)
