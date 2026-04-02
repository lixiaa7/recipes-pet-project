import type {IRecipeDetails} from "../types/IRecipeDetails.types.ts";

export type IngredientCatalogEntry = {
    label: string;
    slug: string;
    searchValue: string;
    variants: string[];
    recipeIds: number[];
};

const PREPARATION_SUFFIXES = [
    "sliced",
    "diced",
    "chopped",
    "minced",
    "shredded",
    "grated",
    "crushed",
    "peeled",
    "seeded",
    "softened",
    "melted",
    "cooked",
    "cut into pieces",
    "boneless and skinless",
    "skinless and boneless",
    "skinless",
    "boneless",
    "to taste",
];

const normalizeWhitespace = (value: string) => value.replace(/\s+/g, " ").trim();

const stripQuotes = (value: string) => value.replace(/^["']+|["']+$/g, "");

const toTitleCase = (value: string) =>
    value
        .split(" ")
        .filter(Boolean)
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");

export const normalizeIngredientName = (ingredient: string) => {
    const cleaned = normalizeWhitespace(stripQuotes(ingredient))
        .replace(/\([^)]*\)/g, "")
        .trim();

    if (!cleaned) {
        return "";
    }

    const [primaryPart] = cleaned.split(",");
    const withoutSuffix = PREPARATION_SUFFIXES.reduce((currentValue, suffix) => {
        const suffixPattern = new RegExp(`\\b${suffix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i");
        return currentValue.replace(suffixPattern, "").trim();
    }, primaryPart.trim());

    return normalizeWhitespace(toTitleCase(withoutSuffix));
};

export const ingredientToSlug = (ingredient: string) =>
    normalizeIngredientName(ingredient)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

export const getIngredientsCatalog = (data: IRecipeDetails[] | undefined): IngredientCatalogEntry[] => {
    if (!data) {
        return [];
    }

    const catalog = new Map<string, IngredientCatalogEntry>();

    data.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
            const label = normalizeIngredientName(ingredient);
            const slug = ingredientToSlug(label);

            if (!label || !slug) {
                return;
            }

            const existingEntry = catalog.get(slug);

            if (!existingEntry) {
                catalog.set(slug, {
                    label,
                    slug,
                    searchValue: label.toLowerCase(),
                    variants: [ingredient],
                    recipeIds: [recipe.id],
                });
                return;
            }

            if (!existingEntry.variants.includes(ingredient)) {
                existingEntry.variants.push(ingredient);
            }

            if (!existingEntry.recipeIds.includes(recipe.id)) {
                existingEntry.recipeIds.push(recipe.id);
            }
        });
    });

    return Array.from(catalog.values()).sort((left, right) => left.label.localeCompare(right.label));
};
