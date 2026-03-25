import { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Recipes from './routes/Recipes.tsx'
import Categories from './routes/Categories.tsx'
import Meals from './routes/Meals.tsx'
import Ingredients from './routes/Ingredients.tsx'
import CuisinesPage from "./routes/Cuisines.tsx";

import './index.css'
import App from './App.tsx'

const queryClient = new QueryClient();

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: < Recipes/> },
            { path: '/categories', element: <Categories/> },
            { path: '/meals', element: <Meals/> },
            { path: 'ingredients', element: <Ingredients/> },
            { path: 'cuisines', element: <CuisinesPage/> },
            // { path: 'about', element: <About /> },
        ],
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}>
              <App />
          </RouterProvider>
      </QueryClientProvider>


  </StrictMode>,
)
