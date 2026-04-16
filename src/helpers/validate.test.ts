import {describe, expect, it} from "vitest";
import {validate} from "./validate.ts";
import {createRecipeForm} from "../test/fixtures.ts";

describe("validate", () => {
    it("returns no errors for a valid form", () => {
        expect(validate(createRecipeForm())).toEqual({});
    });

    it("reports all required field errors", () => {
        const form = createRecipeForm({
            name: "   ",
            image: "   ",
            mealType: [],
            ingredients: [],
            cookTimeMinutes: 0,
            caloriesPerServing: 0,
            servings: 0,
        });

        expect(validate(form)).toEqual({
            name: "Title is required",
            image: "Image URL is required",
            mealType: "Choose at least one meal type",
            ingredients: "Add at least one ingredient",
            cookTimeMinutes: "Cooking time must be greater than 0",
            caloriesPerServing: "Calories must be greater than 0",
            servings: "Servings must be greater than 0",
        });
    });

    it("requires instructions only when the flag is enabled", () => {
        const form = createRecipeForm({
            instructions: ["   ", ""],
        });

        expect(validate(form)).toEqual({});
        expect(validate(form, true)).toEqual({
            instructions: "Instructions are required",
        });
    });
});
