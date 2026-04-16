import {describe, expect, it} from "vitest";
import {createInitialRecipeForm} from "./createInitialRecipeForm.ts";

describe("createInitialRecipeForm", () => {
    it("creates a fresh form with unique identifiers", () => {
        const firstForm = createInitialRecipeForm();
        const secondForm = createInitialRecipeForm();

        expect(firstForm.id).not.toBe(secondForm.id);
        expect(firstForm.userId).not.toBe(secondForm.userId);
        expect(firstForm.instructions).toEqual([]);
        expect(firstForm.ingredients).toEqual([]);
    });
});
