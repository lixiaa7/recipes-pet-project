import type * as React from "react";

type InputFormProps = React.InputHTMLAttributes<HTMLInputElement>;

export const InputForm = ({className = "", ...props}: InputFormProps) => {
    return (
        <input
            {...props}
            className={`min-h-11 w-full rounded-2xl border border-stone-200 bg-white px-4 text-sm text-stone-800 outline-none transition placeholder:text-stone-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 ${className}`.trim()}
        />
    );
};
