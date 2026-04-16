import {useRecipes} from "../../hooks/useRecipes.ts";
import RecipeItem from "../../components/RecipeItem.tsx";
import {getGroupedMeals} from "../../helpers/getGroupedMeals.ts";
import {useRef} from "react";
import {scrollCategory} from "../../helpers/scrollCategory.ts";
import Loader from "../../components/Loader.tsx";

export default function MealsPage() {
    const {data: recipes, isLoading, error} = useRecipes();
    const sliderRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const groupedMeals = getGroupedMeals(recipes);

    if (isLoading) return <Loader label="Gathering meal collections" />;
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
                                Meals
                            </p>
                            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
                                Explore by meal type
                            </h1>
                        </div>
                        <div
                            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-stone-700 shadow-sm ring-1 ring-orange-100">
                            {Object.keys(groupedMeals).length} categories
                        </div>
                    </div>

                    <div className="space-y-8">
                        {Object.entries(groupedMeals).map(([category, recipes]) => (
                            <section
                                key={category}
                                className="rounded-[1.75rem] border border-white/70 bg-white/90 p-5 shadow-[0_20px_50px_-34px_rgba(15,23,42,0.4)] sm:p-6"
                            >
                                <div
                                    className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-orange-500">
                                            {category}
                                        </p>
                                        <h2 className="mt-2 text-2xl font-bold tracking-tight text-stone-900">
                                            {recipes.length} recipes in this collection
                                        </h2>
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <button
                                            type="button"
                                            onClick={() => scrollCategory(category, "left", sliderRefs)}
                                            className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-lg font-bold text-stone-700 shadow-sm transition hover:border-orange-200 hover:text-orange-600"
                                            aria-label={`Scroll ${category} recipes left`}
                                        >
                                            {"<"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => scrollCategory(category, "right", sliderRefs)}
                                            className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-lg font-bold text-stone-700 shadow-sm transition hover:border-orange-200 hover:text-orange-600"
                                            aria-label={`Scroll ${category} recipes right`}
                                        >
                                            {">"}
                                        </button>
                                    </div>
                                </div>

                                <div
                                    ref={(element) => {
                                        sliderRefs.current[category] = element;
                                    }}
                                    className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
                                >
                                    {recipes.map((recipe) => (
                                        <div
                                            key={recipe.id}
                                            className="min-w-[280px] flex-[0_0_280px] snap-start sm:min-w-[320px] sm:flex-[0_0_320px]"
                                        >
                                            <RecipeItem recipe={recipe}/>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    )
}
