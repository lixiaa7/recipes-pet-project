import timer from '../assets/images/timer.svg'
import StarRating from "./StarRating.tsx";
import {Link} from "react-router-dom";
import type {IRecipeDetails} from "../types/IRecipeDetails.types.ts";

export default function RecipeItem({recipe}: {recipe: IRecipeDetails}) {

    return (
        <div className="cursor-pointer">
            <Link to={`/recipes/${recipe.id}`}>
            <img src={recipe.image} alt={recipe.name} className="rounded-tl-2xl rounded-tr-2xl mb-1"/>
            <div className="flex flex-col items-center justify-center py-1 text-center">
                <p className="p-1 font-semibold">{recipe.name}</p>
                <div className="flex flex-row gap-3  content-between py-1">
                    <div className="flex gap-1 justify-center content-center items-center">
                        <p className="text-gray-500"><span
                            className="font-semibold text-black">{recipe.cookTimeMinutes}</span> min</p>
                        <img src={timer} alt="timer" className="w-5 h-5 object-contain"/>
                    </div>
                    <p className="text-gray-500"><span
                        className="font-semibold text-black">{recipe.caloriesPerServing}</span> kcal</p>
                </div>
                <StarRating rating={recipe.rating} />
            </div>
        </Link>
        </div>

    )
}