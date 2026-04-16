import {useDispatch} from 'react-redux'
import {openModal} from "../../store/modalSlice.ts";

type AddRecipeButtonProps = {
    className?: string;
    onClick?: () => void;
};

export const AddRecipeButton = ({className = "", onClick}: AddRecipeButtonProps) => {
    const dispatch = useDispatch()

    return (
        <button onClick={() => {
            dispatch(openModal());
            onClick?.();
        }}
                className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/18 bg-white/6 px-4.5 text-sm font-medium text-white transition hover:border-orange-300/60 hover:text-orange-200 min-[640px]:min-h-12 min-[640px]:px-5 min-[930px]:min-h-10 min-[930px]:w-auto min-[930px]:px-4 ${className}`.trim()}>
            <span className="text-base leading-none text-orange-400">+</span>
            <span className="tracking-[0.04em]">Add recipe</span>
        </button>
    );
};

