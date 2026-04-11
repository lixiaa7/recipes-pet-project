import type {ReactNode} from "react";

type AddedItemProps = {
    onRemove: () => void;
    children: ReactNode;
};

export const AddedItem = ({onRemove, children}: AddedItemProps) => {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-2 text-sm text-stone-700 shadow-sm">
            <span>{children}</span>
            <button
                type="button"
                onClick={onRemove}
                className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-100 text-orange-700 transition hover:bg-orange-500 hover:text-white"
                aria-label="Remove ingredient"
            >
                x
            </button>
        </div>
    );
};
