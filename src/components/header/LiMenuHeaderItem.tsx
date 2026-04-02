import {Link} from 'react-router-dom'
import * as React from "react";

type LiMenuHeaderItemProps = {
    category?: string;
    mainCategory: string;
    children?: React.ReactNode;
};

export default function LiMenuHeaderItem({category = "", mainCategory, children}: LiMenuHeaderItemProps) {

    return (
        <>
            <Link to={`/${mainCategory}/${category?.toLowerCase()}`}>
                <li className="px-4 py-2 text-white font-light bg-stone-800 text-left hover:text-orange-500 hover:bg-stone-700">{children}</li>
            </Link>
        </>
    )
}