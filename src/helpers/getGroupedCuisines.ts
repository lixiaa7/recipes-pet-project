import type {IGroupedCuisines, IRecipeDetails} from "../types/IRecipeDetails.types.ts";

export const getGroupedCuisines = (recipes: IRecipeDetails[]): IGroupedCuisines => {
    const getGroupedCuisines = recipes.reduce<IGroupedCuisines>((acc, recipe) => {
        const key = recipe['cuisine']

        if (!acc[key]) {
            acc[key] = [];
        }

        acc[key].push(recipe);

        return acc;
    }, {});
    return getGroupedCuisines;
}