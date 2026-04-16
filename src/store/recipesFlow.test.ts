import {describe, expect, it} from "vitest";
import reducer, {addRecipe, deleteRecipe, hydrateRecipes} from "./recipesSlice.ts";
import {createRecipe} from "../test/fixtures.ts";
import {getGroupedMeals} from "../helpers/getGroupedMeals.ts";
import {getRecipesByMealType} from "../helpers/getRecipesByMealType.ts";
import {getGroupedCuisines} from "../helpers/getGroupedCuisines.ts";
import {getFilteredIngredient} from "../helpers/getFilteredIngredient.ts";

describe("recipes store flow", () => {
    it("keeps added recipes visible across derived pages after hydration", () => {
        const remoteDinner = createRecipe({
            id: 1,
            name: "Remote Pasta",
            cuisine: "Italian",
            mealType: ["Dinner"],
            ingredients: ["Tomatoes", "Basil"],
        });
        const remoteBreakfast = createRecipe({
            id: 2,
            name: "Remote Omelette",
            cuisine: "French",
            mealType: ["Breakfast"],
            ingredients: ["Eggs", "Butter"],
        });
        const addedRecipe = createRecipe({
            id: 99,
            name: "Chicken Rice Bowl",
            cuisine: "Asian",
            mealType: ["Lunch", "Dinner"],
            ingredients: ["Chicken breast", "Jasmine rice", "Green onion"],
        });

        const hydratedState = reducer(undefined, hydrateRecipes([remoteDinner, remoteBreakfast]));
        const stateWithAddedRecipe = reducer(hydratedState, addRecipe(addedRecipe));

        const mealGroups = getGroupedMeals(stateWithAddedRecipe.items);
        const cuisines = getGroupedCuisines(stateWithAddedRecipe.items);
        const lunchRecipes = getRecipesByMealType(mealGroups, "lunch");
        const asianRecipes = cuisines.Asian ?? [];
        const chickenRecipes = getFilteredIngredient(stateWithAddedRecipe.items, "chicken") ?? [];

        expect(stateWithAddedRecipe.items).toEqual([remoteDinner, remoteBreakfast, addedRecipe]);
        expect(lunchRecipes).toEqual([addedRecipe]);
        expect(asianRecipes).toEqual([addedRecipe]);
        expect(chickenRecipes).toEqual([addedRecipe]);
    });

    it("removes deleted recipes from all derived pages and does not restore them on later hydration", () => {
        const remoteDinner = createRecipe({
            id: 1,
            name: "Remote Pasta",
            cuisine: "Italian",
            mealType: ["Dinner"],
            ingredients: ["Tomatoes", "Basil"],
        });
        const remoteBreakfast = createRecipe({
            id: 2,
            name: "Remote Omelette",
            cuisine: "French",
            mealType: ["Breakfast"],
            ingredients: ["Eggs", "Butter"],
        });
        const addedRecipe = createRecipe({
            id: 99,
            name: "Chicken Rice Bowl",
            cuisine: "Asian",
            mealType: ["Lunch", "Dinner"],
            ingredients: ["Chicken breast", "Jasmine rice", "Green onion"],
        });

        const hydratedState = reducer(undefined, hydrateRecipes([remoteDinner, remoteBreakfast]));
        const stateWithAddedRecipe = reducer(hydratedState, addRecipe(addedRecipe));
        const afterDeleteRemote = reducer(stateWithAddedRecipe, deleteRecipe(remoteDinner.id));
        const afterDeleteAdded = reducer(afterDeleteRemote, deleteRecipe(addedRecipe.id));
        const afterSecondHydration = reducer(
            afterDeleteAdded,
            hydrateRecipes([createRecipe({id: 3, name: "Should not be merged"})]),
        );

        const mealGroups = getGroupedMeals(afterSecondHydration.items);
        const cuisines = getGroupedCuisines(afterSecondHydration.items);
        const dinnerRecipes = getRecipesByMealType(mealGroups, "dinner");
        const asianRecipes = cuisines.Asian ?? [];
        const italianRecipes = cuisines.Italian ?? [];
        const chickenRecipes = getFilteredIngredient(afterSecondHydration.items, "chicken") ?? [];

        expect(afterSecondHydration.items).toEqual([remoteBreakfast]);
        expect(dinnerRecipes).toEqual([]);
        expect(asianRecipes).toEqual([]);
        expect(italianRecipes).toEqual([]);
        expect(chickenRecipes).toEqual([]);
    });
});
