import RecipeItem from "./RecipeItem.tsx";
import type {IRecipeDetails} from "../types/IRecipeDetails.types.ts";

export interface RecipesByCategory {
    [key: string]: IRecipeDetails[];
}

export default function CategorySection({groupedCategory}: {groupedCategory: RecipesByCategory}) {
    // console.log(groupedCategory)

    return (
        <div className="flex flex-col">
            {Object.entries(groupedCategory).map(([cuisine, recipes]) => (
                <div key={cuisine} >
                <p className="text-red-500">{cuisine}</p>
                <div key={cuisine}>
                    {/*{recipes.map(r => <p key={r.id}>{r.name}</p>)}*/}
                    {recipes.map(recipe => <RecipeItem recipe={recipe}/>)}

                </div>
                </div>
            ))}
        </div>
    )

}