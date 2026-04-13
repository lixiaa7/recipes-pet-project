import {useDispatch} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useRecipeDetails} from '../../hooks/useRecipeDetails.ts'
import timer from "../../assets/images/timer.svg";
import person from "../../assets/images/person.svg";
import StarRating from "../../components/StarRating.tsx";
import {PageTitle} from "../../components/PageTitle.tsx";
import {deleteRecipe} from "../../store/recipesSlice.ts";
import type {AppDispatch} from "../../store/store.ts";

export default function RecipeDetailsPage() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const recipeId = Number(useParams().id ?? 0);
    const {data, isLoading, error} = useRecipeDetails(recipeId);

    const handleDeleteRecipe = () => {
        const isConfirmed = window.confirm(`Delete "${data?.name}" recipe?`);

        if (!isConfirmed) {
            return;
        }

        dispatch(deleteRecipe(recipeId));
        navigate('/', {replace: true});
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error.message}</p>;
    }

    if (!data) {
        return <p>Recipe not found</p>;
    }

    return (
        <>
            <PageTitle title={data.name}/>
            <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
                <div
                    className="mb-3.5 overflow-hidden rounded-[2rem] border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-amber-50 shadow-[0_24px_80px_-32px_rgba(180,83,9,0.4)]">
                    <div className="px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
                        <div className="mb-8 flex flex-col gap-5 border-b border-orange-100 pb-8">
                            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                <div className="space-y-3">
                                    <h1 className="max-w-3xl text-3xl font-extrabold tracking-tight text-stone-900 sm:text-4xl">
                                        {data.name}
                                    </h1>
                                </div>

                                <button
                                    type="button"
                                    onClick={handleDeleteRecipe}
                                    className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-red-200 bg-red-50 px-5 text-sm font-semibold text-red-700 transition hover:border-red-500 hover:bg-red-500 hover:text-white"
                                >
                                    Delete recipe
                                </button>
                            </div>

                            <div className="flex flex-wrap items-center gap-3 text-sm text-stone-600">
                                <div
                                    className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-orange-100">
                                    <img src={timer} alt="timer" className="h-5 w-5 object-contain"/>
                                    <p>
                                        <span
                                            title="preparation time"
                                            className="font-semibold text-stone-900">{data.cookTimeMinutes}</span> min
                                    </p>
                                </div>
                                <div className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-orange-100">
                                    <span className="font-semibold text-stone-900">{data.caloriesPerServing}</span> kcal
                                </div>
                                <div
                                    className="flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-orange-100">
                                    <span className="font-semibold text-stone-900">{data.servings}</span>
                                    <img src={person} alt="person" className="h-5 w-5"/>
                                </div>
                                <div className="rounded-full bg-white px-4 py-2 shadow-sm ring-1 ring-orange-100">
                                    <StarRating rating={data.rating}/>
                                </div>
                            </div>
                        </div>

                        <div className="grid items-stretch gap-6 lg:grid-cols-2">
                            <div
                                className="group relative overflow-hidden rounded-[1.75rem] bg-white shadow-[0_20px_60px_-30px_rgba(15,23,42,0.35)] ring-1 ring-stone-200">
                                <div
                                    className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/10 to-transparent"/>
                                <img
                                    src={data.image}
                                    alt={data.name}
                                    className="h-full min-h-[320px] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                                />
                            </div>

                            <div
                                className="flex min-h-[320px] flex-col rounded-[1.75rem] border border-orange-100 bg-white/95 p-6 shadow-[0_24px_60px_-36px_rgba(234,88,12,0.45)] backdrop-blur-sm sm:p-8">
                                <div className="mb-6 flex items-center justify-between gap-4">
                                    <div>
                                        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500">
                                            Ingredients
                                        </p>
                                        <h2 className="mt-2 text-2xl font-bold text-stone-900">
                                            Everything you need
                                        </h2>
                                    </div>
                                    <div
                                        className="rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-700">
                                        {data.ingredients.length} items
                                    </div>
                                </div>

                                <ul className="grid gap-3 text-stone-700 sm:grid-cols-2">
                                    {data.ingredients.map((item) => (
                                        <li
                                            key={item}
                                            className="rounded-2xl border border-stone-200 bg-stone-50 px-4 py-3 text-sm font-medium shadow-[0_10px_30px_-24px_rgba(15,23,42,0.8)]"
                                        >
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="rounded-[2rem] border border-stone-200 bg-white p-6 shadow-[0_24px_60px_-36px_rgba(15,23,42,0.35)] sm:p-8">
                    <div
                        className="mb-8 flex flex-col gap-4 border-b border-stone-100 pb-6 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500">
                                Directions
                            </p>
                            <h2 className="mt-2 text-3xl font-bold tracking-tight text-stone-900">
                                Cook it like a pro
                            </h2>
                        </div>
                    </div>

                    <ol className="grid gap-4 lg:grid-cols-2">
                        {data.instructions.map((item, i) => (
                            <li
                                key={`${i}-${item}`}
                                className="flex gap-4 rounded-[1.5rem] border border-orange-100 bg-gradient-to-br from-orange-50 via-white to-stone-50 p-5 shadow-[0_18px_40px_-34px_rgba(234,88,12,0.7)]"
                            >
                                <div
                                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-stone-900 text-base font-bold text-white shadow-[0_12px_24px_-16px_rgba(15,23,42,0.8)]">
                                    {i + 1}
                                </div>
                                <div className="pt-1">
                                    <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
                                        Step {i + 1}
                                    </p>
                                    <p className="text-sm leading-7 text-stone-700 sm:text-base">
                                        {item}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </>
    )
}
