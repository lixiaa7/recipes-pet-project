import {useParams} from "react-router-dom";
import {useRecipeDetails} from '../hooks/useRecipeDetails.ts'
import timer from "../assets/images/timer.svg";
import person from "../assets/images/person.svg";
import StarRating from "../components/StarRating.tsx";

export default function RecipeDetailsPage() {
    const params = useParams().id;
    const {data, isLoading} = useRecipeDetails(Number(params));

    console.log(data)
    return (
        <>
            {isLoading && <p>Loading...</p>}
            <div className="flex flex-col justify-center items-start text-left my-5">

                <div className="flex flex-col w-3/5 items-start">
                    <div className="flex w-full flex-col items-start justify-start p-1 mb-2.5">
                        <p className="p-1 font-bold text-3xl mb-2">{data?.name}</p>
                        <div className="flex justify-between w-full">
                            <div className="flex flex-row gap-3  content-between py-1">
                                <div className="flex gap-1 justify-center content-center items-center">
                                    <p className="text-gray-500"><span
                                        className="font-semibold text-black">{data?.cookTimeMinutes}</span> min</p>
                                    <img src={timer} alt="timer" className="w-5 h-5 object-contain"/>
                                </div>
                                <p className="text-gray-500"><span
                                    className="font-semibold text-black">{data?.caloriesPerServing}</span> kcal</p>
                            </div>
                            <div className="flex gap-1 items-center">{data?.servings}
                                <img src={person} alt="person" className="w-5 h-5" />
                            </div>
                            <StarRating rating={data?.rating}/>
                        </div>
                    </div>
                    <img src={data?.image} alt="" className=""/>
                </div>
            </div>
        </>
    )
}