import {useRecipes} from "../hooks/useRecipes.ts";
import {getGroupedCuisines} from "../helpers/getCategory.ts";
import CategorySection from "../components/CategorySection.tsx";

export default function CuisinesPage() {
    const {data} = useRecipes();

    if (!data) return <p>Loading...</p>;
    const groupedCuisines = getGroupedCuisines(data)

    return (
        <>
            <CategorySection groupedCategory={groupedCuisines}/>
        </>
    )
}