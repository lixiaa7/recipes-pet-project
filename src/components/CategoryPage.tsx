import RecipeItem from "./RecipeItem.tsx";
import Loader from "./Loader.tsx";
import type {IRecipeDetails} from "../types/IRecipeDetails.types.ts";

type CategoryPageProps = {
    params?: string;
    value?: string;
    category: string;
    isLoading: boolean;
    error: Error | null;
    data?: IRecipeDetails[];
};

export default function CategoryPage({params, value, category, isLoading, error, data}: CategoryPageProps) {

    return (
    <>
        <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="mb-6 text-3xl font-extrabold tracking-tight text-stone-900">
                {params && value ? value[0].toUpperCase() + value.slice(1) : `${category}`}
            </h1>

            {isLoading && <Loader label="Preparing this category" className="min-h-[180px] py-6" />}
            {error && <p>{error.message}</p>}

            {!isLoading && !error && data?.length === 0 && (
                <p className="text-stone-600">No recipes found for this category.</p>
            )}

            {data && data.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {data.map((recipe) => (
                        <RecipeItem key={recipe.id} recipe={recipe}/>
                    ))}
                </div>
            )}
        </div>
    </>
    )
}
