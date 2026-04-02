import type {IMealType} from "../types/IMealTypes.types.ts";
import type {IRecipeDetails} from "../types/IRecipeDetails.types.ts";

const normalizeMealType = (value: string) => value.trim().toLowerCase();

export function getRecipesByMealType(data: IMealType, selectedCategory: string): IRecipeDetails[] {
    const normalizedCategory = normalizeMealType(selectedCategory);

    return Object.entries(data)
        .filter(([key]) =>
            key.split(',').some((item) => normalizeMealType(item) === normalizedCategory)
        )
        .flatMap(([, value]) => value);
}
