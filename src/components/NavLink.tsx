import {NavLink} from 'react-router-dom'
import type {ReactNode} from "react";

type NavLinkProps = {
    link: string
    children?: ReactNode
    className?: string
    onClick?: () => void
}

export default function NavLinkMenu({link, children, className = "", onClick}: NavLinkProps) {
    return (
        <>
            <NavLink to={link} className={({isActive}) =>
            `uppercase ${
                isActive ?
                    'text-orange-500' : 
                    'text-white'
            } ${className}`.trim()
            } onClick={onClick}>{children}</NavLink>
        </>
    )
}
