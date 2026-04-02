import {useParams} from "react-router-dom";
import {useCuisine} from "../../hooks/useCuisine.ts";
import CategoryPage from "../../components/CategoryPage.tsx";

export default function CuisinesByCategory({category}: string) {
    const params = useParams();
    const value = params[category] ?? '';
    const {data, isLoading, error} = useCuisine(value);

    return (
        <CategoryPage data={data} isLoading={isLoading} error={error} category={category} />
    )
}
