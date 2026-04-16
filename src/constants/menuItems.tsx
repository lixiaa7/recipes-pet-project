import {ingredientCategories} from "../helpers/ingredientCategories.ts";

export const cuisine = ["Italian", "Asian", "Indian", "Mexican", "Mediterranean", "Pakistani"];

export const mealTypes = ["Dinner", "Lunch", "Breakfast", "Snack", "Dessert", "Beverage", "Side Dish", "Appetizer"];

export const ingredients = ingredientCategories.map((category) => category.label);

export const popularIngredientCards = [
    {
        name: "Chicken",
        image: "\uD83C\uDF57",
        description: "Lean, versatile protein for grills, soups, pasta, and bowls.",
        tag: "Protein pick",
        accent: "from-amber-200 via-orange-100 to-rose-100",
    },
    {
        name: "Garlic",
        image: "\uD83E\uDDC4",
        description: "Sharp aromatic base that lifts sauces, marinades, and roasts.",
        tag: "Aroma boost",
        accent: "from-stone-200 via-amber-50 to-orange-100",
    },
    {
        name: "Tomatoes",
        image: "\uD83C\uDF45",
        description: "Juicy and bright for salads, pasta, slow-cooked sauces, and soups.",
        tag: "Fresh acidity",
        accent: "from-rose-200 via-orange-100 to-amber-50",
    },
    {
        name: "Onions",
        image: "\uD83E\uDDC5",
        description: "Sweetness and depth for caramelizing, sauteing, braising, and stocks.",
        tag: "Kitchen base",
        accent: "from-amber-100 via-yellow-50 to-stone-100",
    },
    {
        name: "Salt",
        image: "\uD83E\uDDC2",
        description: "Essential seasoning that sharpens texture, balance, and flavor contrast.",
        tag: "Core seasoning",
        accent: "from-slate-200 via-white to-orange-50",
    },
    {
        name: "Pepper",
        image: "\uD83C\uDF36\uFE0F",
        description: "Warm kick for finishing meats, eggs, vegetables, and creamy sauces.",
        tag: "Heat note",
        accent: "from-red-200 via-orange-100 to-amber-50",
    },
    {
        name: "Olive oil",
        image: "\uD83E\uDED2",
        description: "Silky richness for dressings, roasting, dipping, and pan searing.",
        tag: "Mediterranean staple",
        accent: "from-lime-200 via-emerald-100 to-amber-50",
    },
    {
        name: "Rice",
        image: "\uD83C\uDF5A",
        description: "Reliable base for hearty lunches, quick dinners, and comfort bowls.",
        tag: "Pantry hero",
        accent: "from-stone-100 via-orange-50 to-yellow-50",
    },
    {
        name: "Cheese",
        image: "\uD83E\uDDC0",
        description: "Creamy finish for baked dishes, snacks, salads, and layered comfort food.",
        tag: "Creamy finish",
        accent: "from-yellow-200 via-amber-100 to-orange-50",
    },
    {
        name: "Butter",
        image: "\uD83E\uDDC8",
        description: "Rich texture and golden flavor for pastries, sauces, and pan frying.",
        tag: "Rich touch",
        accent: "from-yellow-100 via-amber-50 to-orange-50",
    },
] as const;

export const cuisines = ["italian", "asian", "american", "mexican", "pakistani", "japanese", "thai", "indian", "russian", "turkish", "smoothie", "lebanese", "korean", "moroccan", "greek", "mediterranean", "brazilian"];
