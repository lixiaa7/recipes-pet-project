import {useDispatch} from 'react-redux'
import {openModal} from "../../store/modalSlice.ts";


export const AddRecipeButton = () => {
    const dispatch = useDispatch()

    return (
        <button onClick={() => dispatch(openModal())}
                className="flex items-center bg-stone-800 text-white border border-white rounded h-1/2 px-6 uppercase text-bold  cursor-pointer hover:bg-stone-700">
            +Add recipe
        </button>
    );
};

