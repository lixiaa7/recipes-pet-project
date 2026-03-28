import {useRecipes} from "../hooks/useRecipes.ts";
import RecipeItem from "../components/RecipeItem.tsx";
import type {IRecipeDetails} from "../types/IRecipeDetails.types.ts";

export default function RecipesPage() {
    const { data, isLoading, error } = useRecipes();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;

    return (
        <div className="max-w-4/6">
            <ul className="grid grid-cols-4 gap-3 mt-2.5 mb-2.5 ">
            {data?.map((recipe: IRecipeDetails) => (
                    <li key={recipe.id} className="bg-white shadow-md p-4 rounded"><RecipeItem recipe={recipe}/></li>
            ))}
            </ul>
        </div>
    )
}