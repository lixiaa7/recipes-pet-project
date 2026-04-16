import {describe, expect, it} from "vitest";
import {capitalize} from "./capitalize.ts";
import {getFilteredIngredient} from "./getFilteredIngredient.ts";
import {getGroupedCuisines} from "./getGroupedCuisines.ts";
import {getGroupedMeals} from "./getGroupedMeals.ts";
import {getRecipesByMealType} from "./getRecipesByMealType.ts";
import {createRecipe} from "../test/fixtures.ts";

describe("capitalize", () => {
    it("formats slugs and encoded values into title case", () => {
        expect(capitalize("main-course")).toBe("Main Course");
        expect(capitalize("creme%20brulee")).toBe("Creme Brulee");
    });

    it("returns an empty string for empty input", () => {
        expect(capitalize("")).toBe("");
    });
});

describe("getGroupedMeals", () => {
    it("groups recipes under every declared meal type", () => {
        const breakfastRecipe = createRecipe({id: 1, mealType: ["Breakfast", "Brunch"]});
        const dinnerRecipe = createRecipe({id: 2, mealType: ["Dinner"]});

        expect(getGroupedMeals([breakfastRecipe, dinnerRecipe])).toEqual({
            Breakfast: [breakfastRecipe],
            Brunch: [breakfastRecipe],
            Dinner: [dinnerRecipe],
        });
    });

    it("returns an empty object when there are no recipes", () => {
        expect(getGroupedMeals()).toEqual({});
        expect(getGroupedMeals([])).toEqual({});
    });
});

describe("getGroupedCuisines", () => {
    it("groups recipes by cuisine", () => {
        const italianRecipe = createRecipe({id: 1, cuisine: "Italian"});
        const mexicanRecipe = createRecipe({id: 2, cuisine: "Mexican"});

        expect(getGroupedCuisines([italianRecipe, mexicanRecipe])).toEqual({
            Italian: [italianRecipe],
            Mexican: [mexicanRecipe],
        });
    });
});

describe("getRecipesByMealType", () => {
    it("matches categories case-insensitively and inside comma-separated keys", () => {
        const breakfastRecipe = createRecipe({id: 1, mealType: ["Breakfast"]});
        const lunchRecipe = createRecipe({id: 2, mealType: ["Lunch"]});

        const recipes = getRecipesByMealType(
            {
                "Breakfast, Brunch": [breakfastRecipe],
                Lunch: [lunchRecipe],
            },
            " brunch "
        );

        expect(recipes).toEqual([breakfastRecipe]);
    });
});

describe("getFilteredIngredient", () => {
    it("matches ingredient variants by normalized slug", () => {
        const pastaRecipe = createRecipe({id: 1, ingredients: ["Tomatoes, chopped", "Basil"]});
        const soupRecipe = createRecipe({id: 2, ingredients: ["Chicken stock"]});

        expect(getFilteredIngredient([pastaRecipe, soupRecipe], "tomatoes")).toEqual([pastaRecipe]);
    });

    it("returns undefined when search input is empty or recipes are missing", () => {
        expect(getFilteredIngredient(undefined, "tomatoes")).toBeUndefined();
        expect(getFilteredIngredient([], "")).toBeUndefined();
    });
});
