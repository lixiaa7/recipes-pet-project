import {useDispatch, useSelector} from "react-redux";
import {closeModal} from "../store/modalSlice.ts";

export const AddRecipeModal = () => {
    const dispatch = useDispatch();
    return (
        <div
            onClick={() => dispatch(closeModal())}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
        >
            <div
                onClick={(event) => event.stopPropagation()}
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl cursor-pointer"
            >
                <h2 className="mb-3 text-2xl font-bold">Modal window</h2>
                <p className="mb-6 text-stone-700">
                    This is one simple modal without any id.
                </p>

                <button
                    onClick={() => dispatch(closeModal())}
                    className="rounded-lg bg-stone-900 px-4 py-2 text-white cursor-pointer"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

