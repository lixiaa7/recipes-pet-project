import {describe, expect, it} from "vitest";
import {coerceRecipeFormValue} from "./coerceRecipeFormValue.ts";

describe("coerceRecipeFormValue", () => {
    it("keeps text-like fields as strings", () => {
        expect(coerceRecipeFormValue("name", "123")).toBe("123");
        expect(coerceRecipeFormValue("image", "456")).toBe("456");
        expect(coerceRecipeFormValue("cuisine", "789")).toBe("789");
    });

    it("converts numeric recipe fields to numbers", () => {
        expect(coerceRecipeFormValue("cookTimeMinutes", "15")).toBe(15);
        expect(coerceRecipeFormValue("caloriesPerServing", "320")).toBe(320);
        expect(coerceRecipeFormValue("servings", "4")).toBe(4);
    });
});
