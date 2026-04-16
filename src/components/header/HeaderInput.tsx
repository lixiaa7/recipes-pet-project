import {useEffect, useMemo, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import type {RootState} from "../../store/store.ts";
import type {IRecipeDetails} from "../../types/IRecipeDetails.types.ts";
import searchIcon from "../../assets/images/search.svg";

type HeaderInputProps = {
    compact?: boolean;
    onCompactOpenChange?: (isOpen: boolean) => void;
};

export default function HeaderInput({compact = false, onCompactOpenChange}: HeaderInputProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchValue, setSearchValue] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isCompactOpen, setIsCompactOpen] = useState(false);
    const storedRecipes = useSelector((state: RootState) => state.recipes.items) as IRecipeDetails[];

    const closeSearch = () => {
        setIsFocused(false);
        setIsCompactOpen(false);
        onCompactOpenChange?.(false);
    };

    useEffect(() => {
        closeSearch();
        setSearchValue("");
    }, [location.pathname]);

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
        closeSearch();
    };

    const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            closeSearch();
        }
    };

    const handleRecipeSelect = (recipeId: number) => {
        navigate(`/recipes/${recipeId}`);
        setSearchValue("");
        closeSearch();
    };

    const isSearchVisible = compact ? isCompactOpen : true;
    const shouldShowResults = searchTerms.length > 0 && isFocused;

    return (
        <div
            className={`group relative flex items-center justify-center ${compact ? "w-full justify-end" : "w-full pt-0.5 min-[640px]:pt-1 min-[930px]:w-[280px] min-[1100px]:w-[320px] min-[930px]:pt-0"}`}
            onFocus={() => setIsFocused(true)}
            onBlur={handleBlur}
            onKeyDown={(event) => {
                if (event.key === "Escape") {
                    closeSearch();
                }
            }}
        >
            {compact ? (
                <form onSubmit={handleSubmit} className={`flex ${isSearchVisible ? "w-full" : "w-auto justify-end"}`}>
                    <div className={`flex h-11 items-center overflow-hidden rounded-full border border-white/18 bg-white/6 transition-[width,padding] duration-200 ${isSearchVisible ? "w-full pl-4 pr-1" : "w-11 px-0"}`}>
                        {isSearchVisible && (
                            <input
                                autoFocus
                                type="text"
                                value={searchValue}
                                onChange={(event) => setSearchValue(event.target.value)}
                                placeholder="Search recipes"
                                className="min-w-0 flex-1 bg-transparent pr-3 text-sm text-white placeholder:text-stone-400 focus:text-orange-400 focus:outline-none"
                            />
                        )}
                        <button
                            type="button"
                            aria-label="Search recipes"
                            onClick={() => {
                                const nextState = !isCompactOpen;
                                setIsCompactOpen(nextState);
                                setIsFocused(nextState);
                                onCompactOpenChange?.(nextState);
                            }}
                            aria-expanded={isSearchVisible}
                            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/0 bg-white/0 transition hover:border-orange-300/60"
                        >
                            <img src={searchIcon} alt="" className="h-5 w-5 invert" />
                        </button>
                    </div>
                </form>
            ) : (
                <form onSubmit={handleSubmit} className="w-full">
                    <div className="rounded-[22px] border border-stone-500 px-4 transition focus-within:border-orange-400 min-[640px]:px-5 min-[930px]:rounded-b-[14px] min-[930px]:rounded-t-none min-[930px]:border-x-0 min-[930px]:border-t-0 min-[930px]:border-b min-[930px]:border-amber-50 min-[930px]:px-0">
                        <input
                            type="text"
                            value={searchValue}
                            onChange={(event) => setSearchValue(event.target.value)}
                            placeholder="Search recipes"
                            className="w-full bg-transparent px-0 py-3.5 text-white placeholder:text-stone-400 focus:text-orange-400 focus:outline-none min-[640px]:py-4 min-[930px]:px-2 min-[930px]:py-1.5"
                        />
                    </div>
                </form>
            )}

            {shouldShowResults && (
                <div className={`absolute z-50 max-h-[min(60vh,24rem)] overflow-y-auto overflow-x-hidden overscroll-contain border border-stone-700 bg-stone-900 shadow-[0_22px_55px_-32px_rgba(15,23,42,0.8)] ${compact ? "left-0 right-0 top-[calc(100%+0.5rem)] rounded-[22px]" : "left-0 right-0 top-[calc(100%+0.625rem)] rounded-[22px] min-[930px]:top-full min-[930px]:rounded-none min-[930px]:border-0 min-[930px]:shadow-none"}`}>
                    {matchedRecipes.length > 0 ? (
                        <ul className="bg-stone-900">
                            {matchedRecipes.map((recipe) => (
                                <li key={recipe.id}>
                                    <Link
                                        to={`/recipes/${recipe.id}`}
                                        onPointerDown={(event) => {
                                            event.preventDefault();
                                            handleRecipeSelect(recipe.id);
                                        }}
                                        onClick={(event) => {
                                            event.preventDefault();
                                        }}
                                        className="flex items-center justify-between gap-3 px-4 py-3 text-left transition hover:bg-stone-800"
                                    >
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate font-light text-white">{recipe.name}</p>
                                            <p className="mt-1 truncate text-xs uppercase tracking-[0.18em] text-stone-400">
                                                {recipe.cuisine}
                                            </p>
                                        </div>
                                        <span className="shrink-0 text-sm text-stone-400">Open</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <ul className="bg-stone-900">
                            <li className="px-4 py-3 text-sm font-light text-stone-400">No recipes found</li>
                        </ul>
                    )}
                </div>
            )}
        </div>
    )
}
