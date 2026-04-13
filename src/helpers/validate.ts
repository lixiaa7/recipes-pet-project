import type {RecipeForm} from "../types/RecipeForm.types.ts";

export function validate(form: RecipeForm, requireInstructions = false) {
    const errors: Record<string, string> = {};
    const hasInstructions = form.instructions.some((item) => item.trim().length > 0);

    if (!form.name.trim()) {
        errors.name = "Title is required";
    }

    if (!form.image.trim()) {
        errors.image = "Image URL is required";
    }

    if (form.mealType.length === 0) {
        errors.mealType = "Choose at least one meal type";
    }

    if (form.ingredients.length === 0) {
        errors.ingredients = "Add at least one ingredient";
    }

    if (!form.cookTimeMinutes || Number(form.cookTimeMinutes) <= 0) {
        errors.cookTimeMinutes = "Cooking time must be greater than 0";
    }

    if (!form.caloriesPerServing || Number(form.caloriesPerServing) <= 0) {
        errors.caloriesPerServing = "Calories must be greater than 0";
    }

    if (!form.servings || Number(form.servings) <= 0) {
        errors.servings = "Servings must be greater than 0";
    }

    if (requireInstructions && !hasInstructions) {
        errors.instructions = "Instructions are required";
    }

    return errors;
}
