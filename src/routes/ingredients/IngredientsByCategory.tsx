import {getFilteredIngredient} from "../../helpers/getFilteredIngredient.ts";
import {useRecipes} from "../../hooks/useRecipes.ts";
import type {IRecipeDetails} from "../../types/IRecipeDetails.types.ts";
import RecipeItem from "../../components/RecipeItem.tsx";
import {useParams} from "react-router-dom";
import {capitalize} from "../../helpers/capitalize.ts";
import {
    getIngredientCategory,
    getRecipesByIngredientCategory,
} from "../../helpers/ingredientCategories.ts";

export default function IngredientsByCategoryPage() {
    const params = useParams().ingredient || "";
    const {data, isLoading, error} = useRecipes();
    const ingredientCategory = getIngredientCategory(params);
    const filteredIngredient = ingredientCategory
        ? getRecipesByIngredientCategory(data, params)
        : (getFilteredIngredient(data, params) ?? []);
    const pageTitle = ingredientCategory?.label ?? capitalize(params);
    const pageDescription = ingredientCategory?.description ?? "Recipes that use this ingredient.";

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <section
                className="overflow-hidden rounded-[2rem] border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-amber-50 shadow-[0_24px_80px_-32px_rgba(180,83,9,0.35)]">
                <div className="px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
                    <div
                        className="mb-8 flex flex-col gap-4 border-b border-orange-100 pb-8 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500">
                                Ingredients
                            </p>
                            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
                                {pageTitle || 'No ingredient found!'}
                            </h1>
                            <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600 sm:text-base">
                                {pageDescription}
                            </p>
                        </div>
                        <div
                            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-stone-700 shadow-sm ring-1 ring-orange-100">
                            {filteredIngredient.length} recipes
                        </div>
                    </div>

                    <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                        {filteredIngredient.map((recipe: IRecipeDetails) => (
                            <li key={recipe.id}>
                                <RecipeItem recipe={recipe}/>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

        </div>
    )
}
