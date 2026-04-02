import type {IGroupedMeals, IRecipeDetails} from "../types/IRecipeDetails.types.ts";

export const getGroupedMeals = (recipes?: IRecipeDetails[]): IGroupedMeals => {
    if (!recipes?.length) return {};

    return recipes.reduce<IGroupedMeals>((acc, recipe) => {
        recipe.mealType.forEach((mealType) => {
            if (!acc[mealType]) {
                acc[mealType] = [];
            }

            acc[mealType].push(recipe);
        });

        return acc;
    }, {});
}
