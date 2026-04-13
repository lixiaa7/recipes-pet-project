import {useRecipes} from "../../hooks/useRecipes.ts";
import RecipeItem from "../../components/RecipeItem.tsx";
import type {IRecipeDetails} from "../../types/IRecipeDetails.types.ts";
import {useSelector} from 'react-redux';
import {AddRecipeModal} from "../AddRecipeModal.tsx"
import type {RootState} from "../../store/store.ts";

export default function RecipesPage() {
    const {data: recipes, isLoading, error} = useRecipes();
    const isOpen = useSelector((state: RootState) => state.modal.isOpen);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error.message}</p>;

    return (
        <>
            {isOpen && <AddRecipeModal/>}
            <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                <section
                    className="overflow-hidden rounded-[2rem] border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-amber-50 shadow-[0_24px_80px_-32px_rgba(180,83,9,0.35)]">
                    <div className="px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
                        <div
                            className="mb-8 flex flex-col gap-4 border-b border-orange-100 pb-8 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500">
                                    Recipes
                                </p>
                                <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
                                    Pick your next obsession
                                </h1>
                            </div>
                            <div
                                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-stone-700 shadow-sm ring-1 ring-orange-100">
                                {recipes.length} recipes
                            </div>
                        </div>

                        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                            {recipes.map((recipe: IRecipeDetails) => (
                                <li key={recipe.id}>
                                    <RecipeItem recipe={recipe}/>
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            </div>
        </>
    )
}
