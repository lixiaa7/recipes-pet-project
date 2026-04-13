import type {IRecipeDetails} from "./IRecipeDetails.types.ts";

export type RecipeForm = IRecipeDetails & {
    userId: number;
};
