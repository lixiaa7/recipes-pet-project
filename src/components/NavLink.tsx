import {NavLink} from 'react-router-dom'
import {ReactNode} from "react";

type NavLinkProps = {
    link: string
    children?: ReactNode
}

export default function NavLinkMenu({link, children}: NavLinkProps) {
    return (
        <>
            <NavLink to={link} className="uppercase">{children}</NavLink>
        </>
    )
}