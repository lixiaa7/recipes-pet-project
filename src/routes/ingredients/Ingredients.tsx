import {Link} from "react-router-dom";
import {useMemo, useRef, useState} from "react";
import {useRecipes} from "../../hooks/useRecipes.ts";
import {scrollCategory} from "../../helpers/scrollCategory.ts";
import {popularIngredientCards} from "../../constants/menuItems.tsx";
import {alphabet} from "../../helpers/alphabet.ts";
import {getIngredientsCatalog, ingredientToSlug} from "../../helpers/ingredientsCatalog.ts";

export default function IngredientsPage() {
    const {data} = useRecipes();
    const sliderRefs = useRef<Record<string, HTMLDivElement | null>>({});
    const sliderKey = "popular-ingredients";
    const [selectedLetter, setSelectedLetter] = useState<string>("all");
    const [searchValue, setSearchValue] = useState("");

    const ingredientsCatalog = useMemo(() => getIngredientsCatalog(data), [data]);
    const normalizedSearchValue = searchValue.trim().toLowerCase();
    const filteredIngredients = useMemo(() => {
        return ingredientsCatalog.filter((ingredient) => {
            const matchesLetter = selectedLetter === "all" || ingredient.label[0]?.toLowerCase() === selectedLetter;
            const matchesSearch = !normalizedSearchValue || ingredient.searchValue.includes(normalizedSearchValue);

            return matchesLetter && matchesSearch;
        });
    }, [ingredientsCatalog, normalizedSearchValue, selectedLetter]);

    const groupedIngredients = useMemo(() => {
        return alphabet.reduce<Record<string, typeof filteredIngredients>>((groups, letter) => {
            groups[letter] = filteredIngredients.filter((ingredient) => ingredient.label[0]?.toLowerCase() === letter);
            return groups;
        }, {});
    }, [filteredIngredients]);

    const lettersWithIngredients = alphabet.filter((letter) => groupedIngredients[letter]?.length > 0);

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
                                Popular ingredients
                            </h1>
                            <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600 sm:text-base">
                                Curated staples for fast dinners, cozy comfort food, and brighter everyday cooking.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <div
                                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-stone-700 shadow-sm ring-1 ring-orange-100">
                                {popularIngredientCards.length} featured picks
                            </div>
                            <div
                                className="rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white shadow-sm">
                                {data?.length ?? 0} recipes in catalog
                            </div>
                        </div>
                    </div>

                    <div className="mb-5 flex items-center justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => scrollCategory(sliderKey, "left", sliderRefs)}
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-lg font-bold text-stone-700 shadow-sm transition hover:border-orange-200 hover:text-orange-600"
                            aria-label="Scroll popular ingredients left"
                        >
                            {"<"}
                        </button>
                        <button
                            type="button"
                            onClick={() => scrollCategory(sliderKey, "right", sliderRefs)}
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white text-lg font-bold text-stone-700 shadow-sm transition hover:border-orange-200 hover:text-orange-600"
                            aria-label="Scroll popular ingredients right"
                        >
                            {">"}
                        </button>
                    </div>

                    <div
                        ref={(element) => {
                            sliderRefs.current[sliderKey] = element;
                        }}
                        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-2"
                    >
                        {popularIngredientCards.map((ingredient) => (
                            <div
                                key={ingredient.name}
                                className="min-w-[280px] flex-[0_0_280px] snap-start sm:min-w-[320px] sm:flex-[0_0_320px]"
                            >
                                <Link
                                    to={`/ingredients/${ingredientToSlug(ingredient.name)}`}
                                    className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/90 p-5 shadow-[0_22px_55px_-36px_rgba(15,23,42,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_70px_-34px_rgba(234,88,12,0.32)]"
                                >
                                    <div
                                        className={`absolute inset-x-0 top-0 h-36 bg-gradient-to-br ${ingredient.accent} opacity-90 transition duration-300 group-hover:opacity-100`}/>

                                    <div className="relative flex items-start justify-between gap-4">
                                        <span
                                            className="rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-stone-700 shadow-sm backdrop-blur-sm">
                                            {ingredient.tag}
                                        </span>
                                        <span className="text-5xl drop-shadow-[0_10px_20px_rgba(255,255,255,0.55)]">
                                            {ingredient.image}
                                        </span>
                                    </div>

                                    <div className="relative mt-14 flex flex-1 flex-col">
                                        <p className="text-2xl font-extrabold tracking-tight text-stone-900 transition-colors duration-300 group-hover:text-orange-700">
                                            {ingredient.name}
                                        </p>
                                        <p className="mt-3 text-sm leading-6 text-stone-600">
                                            {ingredient.description}
                                        </p>

                                        <div
                                            className="mt-6 flex items-center justify-between gap-3 border-t border-stone-100 pt-4">
                                            <span
                                                className="rounded-full bg-orange-50 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-orange-700 ring-1 ring-orange-100">
                                                View ideas
                                            </span>
                                            <span
                                                className="text-sm font-medium text-stone-500 transition duration-300 group-hover:text-stone-800">
                                                Explore ingredient
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>


                    <div className="my-8">
                        <div className="flex flex-col gap-4 border-b border-orange-100 pb-6 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <h2 className="text-3xl font-extrabold tracking-tight text-stone-900 sm:text-2xl">
                                    Browse ingredients A-Z
                                </h2>
                            </div>
                            <div className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-stone-700 shadow-sm ring-1 ring-orange-100">
                                {filteredIngredients.length} unique ingredients
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className="block text-sm font-semibold uppercase tracking-[0.18em] text-stone-500">
                                Search ingredients
                            </label>
                            <input
                                type="text"
                                value={searchValue}
                                onChange={(event) => setSearchValue(event.target.value)}
                                placeholder="Try chicken, rice, garlic..."
                                className="mt-3 w-full rounded-2xl border border-orange-100 bg-white px-4 py-3 text-sm text-stone-800 shadow-sm outline-none transition focus:border-orange-300 focus:ring-2 focus:ring-orange-100"
                            />
                        </div>

                        <div className="mt-6 flex flex-wrap gap-2">
                            <button
                                type="button"
                                onClick={() => setSelectedLetter("all")}
                                className={`rounded-full px-4 py-2 text-sm font-semibold shadow-sm ring-1 transition ${selectedLetter === "all" ? "bg-stone-900 text-white ring-stone-900" : "bg-white text-stone-700 ring-orange-100 hover:bg-amber-50"}`}
                            >
                                All
                            </button>
                            {alphabet.map((letter) => {
                                return (
                                    <button
                                        key={letter}
                                        type="button"
                                        onClick={() => setSelectedLetter(letter)}
                                        className={`rounded-full px-4 py-2 text-sm font-semibold uppercase shadow-sm ring-1 transition ${selectedLetter === letter ? "bg-orange-500 text-white ring-orange-500" : "bg-white text-stone-700 ring-orange-100 hover:bg-amber-50"}`}
                                    >
                                        {letter}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="mt-8 space-y-8">
                            {lettersWithIngredients.length > 0 ? (
                                lettersWithIngredients.map((letter) => (
                                    <div key={letter} className="rounded-[1.5rem] border border-orange-100 bg-white/80 p-5 shadow-sm">
                                        <div className="mb-4 flex items-center justify-between gap-4 border-b border-stone-100 pb-3">
                                            <h3 className="text-2xl font-extrabold uppercase tracking-[0.18em] text-stone-900">
                                                {letter}
                                            </h3>
                                            <span className="text-sm font-semibold text-stone-500">
                                                {groupedIngredients[letter].length} items
                                            </span>
                                        </div>

                                        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                                            {groupedIngredients[letter].map((ingredient) => (
                                                <li key={ingredient.slug}>
                                                    <Link
                                                        to={`/ingredients/${ingredient.slug}`}
                                                        className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-stone-100 bg-stone-50/70 px-4 py-3 transition hover:border-orange-200 hover:bg-orange-50"
                                                    >
                                                        <div>
                                                            <p className="font-semibold text-stone-900 transition group-hover:text-orange-700">
                                                                {ingredient.label}
                                                            </p>
                                                            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-stone-500">
                                                                {ingredient.recipeIds.length} recipes
                                                            </p>
                                                        </div>
                                                        <span className="text-sm font-medium text-stone-400 transition group-hover:text-stone-700">
                                                            Open
                                                        </span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))
                            ) : (
                                <div className="rounded-[1.5rem] border border-dashed border-orange-200 bg-white/70 px-6 py-10 text-center">
                                    <p className="text-lg font-semibold text-stone-900">No ingredients found</p>
                                    <p className="mt-2 text-sm text-stone-600">
                                        Change the search query or pick another letter.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>


                </div>
            </section>
        </div>
    )
}
