import {useMemo, useState} from "react";
import {useRecipes} from "../../hooks/useRecipes.ts";
import {Link, useNavigate} from "react-router-dom";
import {getIngredientsCatalog} from "../../helpers/ingredientsCatalog.ts";

export default function HeaderInput() {
    const {data} = useRecipes();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const ingredientsCatalog = useMemo(() => getIngredientsCatalog(data), [data]);
    const searchTerms = searchValue
        .toLowerCase()
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    const matchedIngredients = useMemo(() => {
        if (!searchTerms.length) {
            return [];
        }

        return ingredientsCatalog
            .filter((ingredient) => searchTerms.every((term) => ingredient.searchValue.includes(term)))
            .slice(0, 8);
    }, [ingredientsCatalog, searchTerms]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!matchedIngredients.length) {
            return;
        }

        navigate(`/ingredients/${matchedIngredients[0].slug}`);
        setSearchValue("");
    };

    return (
        <div className="group relative flex w-1/4 items-center justify-center">
            <form onSubmit={handleSubmit} className="w-full">
                <input
                    type="text"
                    value={searchValue}
                    onChange={(event) => setSearchValue(event.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Search ingredients"
                    className="w-full border-b border-amber-50 bg-stone-800 p-1.5 text-white placeholder:text-stone-400 focus:text-orange-400 focus:outline-none"
                />
            </form>

            {searchTerms.length > 0 && isFocused && (
                <div className="absolute left-0 right-0 top-full z-50">
                    {matchedIngredients.length > 0 ? (
                        <ul className="bg-stone-800">
                            {matchedIngredients.map((ingredient) => (
                                <li key={ingredient.slug}>
                                    <Link
                                        to={`/ingredients/${ingredient.slug}`}
                                        onClick={() => setSearchValue("")}
                                        className="flex items-center justify-between gap-3 px-4 py-2 text-left transition hover:bg-stone-700"
                                    >
                                        <div>
                                            <p className="font-light text-white">{ingredient.label}</p>
                                            <p className="mt-1 text-xs uppercase tracking-[0.18em] text-stone-400">
                                                {ingredient.recipeIds.length} recipes
                                            </p>
                                        </div>
                                        <span className="text-sm text-stone-400">Open</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <ul className="bg-stone-800">
                            <li className="px-4 py-2 text-sm font-light text-stone-400">No ingredients found</li>
                        </ul>
                    )}
                </div>
            )}
        </div>
    )
}
