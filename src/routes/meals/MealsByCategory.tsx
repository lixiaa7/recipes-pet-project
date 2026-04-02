import {useRecipes} from "../../hooks/useRecipes.ts";
import {getGroupedMeals} from "../../helpers/getGroupedMeals.ts"
import {useParams} from "react-router-dom";
import {getRecipesByMealType} from "../../helpers/getRecipesByMealType.ts";
import {capitalize} from "../../helpers/capitalize.ts";
import CategoryPage from "../../components/CategoryPage.tsx";

export default function MealsByCategoryPage() {
    const {data, isLoading, isError} = useRecipes();
    const params = useParams().mealType || "";
    if (!data) return

    const searchedMealType = capitalize(params)
    const groupedMeals = getGroupedMeals(data);
    const recipesByType = getRecipesByMealType(groupedMeals, searchedMealType)

    return (
        <>
            {data && <CategoryPage data={recipesByType} category={params} params={params} value={params} error={isError}
                                   isLoading={isLoading}/>}
        </>
    )
}