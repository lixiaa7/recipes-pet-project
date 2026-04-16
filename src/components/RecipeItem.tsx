import timer from '../assets/images/timer.svg'
import StarRating from "./StarRating.tsx";
import {Link} from "react-router-dom";
import type {IRecipeDetails} from "../types/IRecipeDetails.types.ts";

export default function RecipeItem({recipe}: {recipe: IRecipeDetails}) {

    return (
        <div className="h-full">
            <Link
                to={`/recipes/${recipe.id}`}
                className="group flex h-full min-w-0 flex-col overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/95 shadow-[0_22px_55px_-36px_rgba(15,23,42,0.55)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_-34px_rgba(234,88,12,0.38)]"
            >
                <div className="relative overflow-hidden">
                    <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between gap-2 p-4">
                        <span className="max-w-[65%] truncate rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-600 shadow-sm backdrop-blur-sm">
                            {recipe.cuisine}
                        </span>
                        <span className="shrink-0 rounded-full bg-stone-900/85 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
                            {recipe.difficulty}
                        </span>
                    </div>

                    <img
                        src={recipe.image}
                        alt={recipe.name}
                        className="h-64 w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />

                    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-stone-950/40 to-transparent"/>
                </div>

                <div className="flex min-w-0 flex-1 flex-col gap-5 p-5">
                    <div className="min-w-0 space-y-3">
                        <p className="break-words text-xl font-bold leading-7 text-stone-900 transition-colors duration-300 group-hover:text-orange-700">
                            {recipe.name}
                        </p>
                        <div className="flex flex-wrap gap-2 text-sm text-stone-600">
                            <div className="flex items-center gap-2 rounded-full bg-orange-50 px-3 py-2 ring-1 ring-orange-100 ">
                                <img src={timer} alt="timer" className="h-4 w-4 object-contain"/>
                                <p>
                                    <span title="preparation time" className="font-semibold text-stone-900">{recipe.cookTimeMinutes}</span> min
                                </p>
                            </div>
                            <div className="rounded-full bg-stone-50 px-3 py-2 ring-1 ring-stone-200">
                                <span className="font-semibold text-stone-900">{recipe.caloriesPerServing}</span> kcal
                            </div>
                            <div className="rounded-full bg-stone-50 px-3 py-2 ring-1 ring-stone-200">
                                <span className="font-semibold text-stone-900">{recipe.servings}</span> servings
                            </div>
                        </div>
                    </div>

                    <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-stone-100 pt-4">
                        <div className="rounded-full bg-white px-3 py-2 shadow-sm ring-1 ring-orange-100">
                            <StarRating rating={recipe.rating} />
                        </div>
                        <span className="rounded-full bg-orange-100 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700">
                            View recipe
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    )
}
