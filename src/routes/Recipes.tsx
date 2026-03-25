import {useRecipes} from "../hooks/useRecipes.ts";
import RecipeItem from "../components/RecipeItem.tsx";

export default function RecipesPage() {
    const { data, isLoading, error } = useRecipes();
    console.log(data?.recipes.forEach(recipe => {
        console.log(recipe.cuisine);
    }))

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error</p>;
    return (
        <div className="max-w-4/5">
            <ul className="flex justify-center items-center flex-wrap gap-1">
            {data?.recipes.map((recipe: {}) => (
                    <li key={recipe.id} className="max-w-1/4 p-2 bg-white rounded-2xl"><RecipeItem recipe={recipe}/></li>
            ))}
            </ul>
        </div>
    )
}