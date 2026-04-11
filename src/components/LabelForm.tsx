import type {ReactNode} from "react";

type LabelFormProps = {
    name: string;
    label?: string;
    children: ReactNode;
    error?: string;
    className?: string;
};

export const LabelForm = ({name, label, children, error, className = ""}: LabelFormProps) => {
    return (
        <label htmlFor={name} className={`flex w-full flex-col gap-2 ${className}`.trim()}>
            {label && (
                <span className="text-sm font-semibold tracking-[0.02em] text-stone-800">
                    {label}
                </span>
            )}
            {children}
            {error && <span className="text-sm text-red-500">{error}</span>}
        </label>
    );
};
