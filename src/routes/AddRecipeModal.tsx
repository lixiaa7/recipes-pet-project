import {useDispatch} from "react-redux";
import {closeModal} from "../store/modalSlice.ts";
import {NewRecipeForm} from "../components/NewRecipeForm.tsx";

export const AddRecipeModal = () => {
    const dispatch = useDispatch();

    return (
        <div
            onClick={() => dispatch(closeModal())}
            className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/55 px-4 py-8"
        >
            <div className="flex min-h-full items-center justify-center">
                <div
                    onClick={(event) => event.stopPropagation()}
                    className="w-full max-w-3xl overflow-hidden rounded-[2rem] border border-stone-200 bg-stone-50 shadow-[0_24px_60px_-40px_rgba(15,23,42,0.45)]"
                >
                    <div className="flex flex-col gap-6 p-5 sm:p-8">
                        <div className="flex items-start justify-between gap-4 border-b border-orange-100 pb-6">
                            <div className="max-w-xl">
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-500">
                                    Add recipe
                                </p>
                                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-stone-900">
                                    Create your own recipe card
                                </h2>
                                <p className="mt-2 text-sm leading-6 text-stone-600 sm:text-base">
                                    Fill in the main details first, then add instructions on the next step.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() => dispatch(closeModal())}
                                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 bg-white text-base font-semibold text-stone-500 transition hover:border-orange-300 hover:text-orange-600"
                                aria-label="Close modal"
                            >
                                x
                            </button>
                        </div>

                        <div className="rounded-[1.75rem] border border-stone-200 bg-white p-5 sm:p-6">
                            <div className="mb-5 flex items-center justify-between gap-3 border-b border-stone-100 pb-4">
                                <p className="text-sm font-semibold text-stone-900">Recipe details</p>
                                <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-orange-600 ring-1 ring-orange-100">
                                    2 steps
                                </span>
                            </div>
                            <NewRecipeForm/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
