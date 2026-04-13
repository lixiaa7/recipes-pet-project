import type {IRecipeDetails} from "../types/IRecipeDetails.types.ts";
import {ingredientToSlug, normalizeIngredientName} from "./ingredientsCatalog.ts";

export type IngredientCategory = {
    slug: string;
    label: string;
    description: string;
    keywords: string[];
    aliases?: string[];
};

export const ingredientCategories: IngredientCategory[] = [
    {
        slug: "chicken",
        label: "Chicken",
        description: "Chicken-based recipes with breast, thigh, mince, or roasted cuts.",
        keywords: ["chicken", "chicken breast", "chicken thigh", "chicken thighs", "ground chicken"],
        aliases: ["poultry"],
    },
    {
        slug: "vegetables",
        label: "Vegetables",
        description: "Savory produce like greens, roots, peppers, tomatoes, onions, and mushrooms.",
        keywords: [
            "tomato",
            "tomatoes",
            "onion",
            "onions",
            "garlic",
            "carrot",
            "carrots",
            "potato",
            "potatoes",
            "spinach",
            "broccoli",
            "cauliflower",
            "cucumber",
            "zucchini",
            "eggplant",
            "mushroom",
            "mushrooms",
            "pepper",
            "bell pepper",
            "chilies",
            "chili",
            "corn",
            "peas",
            "green beans",
            "cabbage",
            "lettuce",
            "celery",
            "ginger",
        ],
        aliases: ["vegetable", "veggies"],
    },
    {
        slug: "seafood",
        label: "Seafood",
        description: "Fish and shellfish recipes with shrimp, salmon, tuna, crab, and more.",
        keywords: [
            "fish",
            "salmon",
            "tuna",
            "cod",
            "shrimp",
            "prawn",
            "prawns",
            "crab",
            "lobster",
            "mussels",
            "clam",
            "clams",
            "squid",
            "octopus",
        ],
        aliases: ["fish"],
    },
    {
        slug: "rice",
        label: "Rice",
        description: "Bowls, pilafs, and mains built around white, brown, jasmine, or basmati rice.",
        keywords: ["rice", "white rice", "brown rice", "jasmine rice", "basmati rice", "wild rice"],
        aliases: ["grain", "grains"],
    },
    {
        slug: "fruits",
        label: "Fruits",
        description: "Sweet, citrus, and tropical ingredients for breakfasts, desserts, and fresh sauces.",
        keywords: [
            "apple",
            "apples",
            "banana",
            "bananas",
            "orange",
            "oranges",
            "lemon",
            "lemons",
            "lime",
            "limes",
            "mango",
            "mangoes",
            "pineapple",
            "grape",
            "grapes",
            "pear",
            "pears",
            "peach",
            "peaches",
            "berries",
            "berry",
            "strawberry",
            "strawberries",
            "blueberry",
            "blueberries",
            "raspberry",
            "raspberries",
            "avocado",
            "avocados",
            "coconut",
        ],
        aliases: ["fruit"],
    },
];

const normalizeIngredientWords = (value: string) =>
    normalizeIngredientName(value)
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter(Boolean);

const matchesKeyword = (ingredient: string, keyword: string) => {
    const ingredientWords = normalizeIngredientWords(ingredient);
    const keywordWords = normalizeIngredientWords(keyword);

    if (!ingredientWords.length || !keywordWords.length) {
        return false;
    }

    return keywordWords.every((word) => ingredientWords.includes(word));
};

export const getIngredientCategory = (value: string) => {
    const normalizedValue = ingredientToSlug(value);

    return ingredientCategories.find((category) =>
        category.slug === normalizedValue ||
        category.aliases?.some((alias) => ingredientToSlug(alias) === normalizedValue)
    );
};

export const getRecipesByIngredientCategory = (data: IRecipeDetails[] | undefined, searchedCategory: string) => {
    const category = getIngredientCategory(searchedCategory);

    if (!data || !category) {
        return [];
    }

    return data.filter((recipe) =>
        recipe.ingredients.some((ingredient) =>
            category.keywords.some((keyword) => matchesKeyword(ingredient, keyword))
        )
    );
};
