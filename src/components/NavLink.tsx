import {NavLink} from 'react-router-dom'
import type {ReactNode} from "react";

type NavLinkProps = {
    link: string
    children?: ReactNode
}

export default function NavLinkMenu({link, children}: NavLinkProps) {
    return (
        <>
            <NavLink to={link} className={({isActive}) =>
            `uppercase ${
                isActive ?
                    'text-orange-500' : 
                    'text-white'
            }`
            }>{children}</NavLink>
        </>
    )
}