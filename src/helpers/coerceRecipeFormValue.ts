const numericRecipeFields = new Set([
    "cookTimeMinutes",
    "caloriesPerServing",
    "servings",
]);

export function coerceRecipeFormValue(name: string, value: string) {
    if (!numericRecipeFields.has(name)) {
        return value;
    }

    return value === "" ? "" : Number(value);
}
