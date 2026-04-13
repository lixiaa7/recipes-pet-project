import type {ReactNode} from "react";

type UlMenuItemHeaderProps = {
    children: ReactNode;
};

export default function UlMenuItemHeader({children}: UlMenuItemHeaderProps) {
    return (
        <ul className="absolute top-full  min-w-[150px] left-0 hidden group-hover:block bg-stone-800  z-50 pt-2.5">{children}</ul>
    )
}
