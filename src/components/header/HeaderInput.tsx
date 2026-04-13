import {useMemo, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import type {RootState} from "../../store/store.ts";
import type {IRecipeDetails} from "../../types/IRecipeDetails.types.ts";

export default function HeaderInput() {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const storedRecipes = useSelector((state: RootState) => state.recipes.items) as IRecipeDetails[];

    const searchTerms = searchValue
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    const matchedRecipes = useMemo(() => {
        if (!searchTerms.length) {
            return [];
        }

        return storedRecipes
            .filter((recipe) => {
                const normalizedName = recipe.name.toLowerCase();
                return searchTerms.every((term) => normalizedName.includes(term));
            })
            .slice(0, 8);
    }, [storedRecipes, searchTerms]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!matchedRecipes.length) {
            return;
        }

        navigate(`/recipes/${matchedRecipes[0].id}`);
        setSearchValue("");
        setIsFocused(false);
    };

    const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            setIsFocused(false);
        }
    };

    const handleRecipeSelect = () => {
        setSearchValue("");
        setIsFocused(false);
    };

    return (
        <div
            className="group relative flex w-1/4 items-center justify-center"
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
        >
            <form onSubmit={handleSubmit} className="w-full">
                <input
                    type="text"
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    placeholder="Search recipes"
                    className="w-full border-b border-amber-50 bg-stone-800 p-1.5 text-white placeholder:text-stone-400 focus:text-orange-400 focus:outline-none"
                />
            </form>

            {searchTerms.length > 0 && isFocused && (
                <div className="absolute left-0 right-0 top-full z-50">
                    {matchedRecipes.length > 0 ? (
                        <ul className="bg-stone-800">
                            {matchedRecipes.map((recipe) => (
                                <li key={recipe.id}>
                                    <Link
                                        to={`/recipes/${recipe.id}`}
                                        onClick={handleRecipeSelect}
                                        className="flex items-center justify-between gap-3 px-4 py-2 text-left transition hover:bg-stone-700"
                                    >
                                        <div>
                                            <p className="font-light text-white">{recipe.name}</p>
                                            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-stone-400">
                                                {recipe.cuisine}
                                            </p>
                                        </div>
                                        <span className="text-sm text-stone-400">Open</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <ul className="bg-stone-800">
                            <li className="px-4 py-2 text-sm font-light text-stone-400">No recipes found</li>
                        </ul>
                    )}
                </div>
            )}
        </div>
    )
}
