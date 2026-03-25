import LiMenuItem from "./LiMenuItem.tsx";
import UlMenuItem from "./UlMenuItem";
import NavLinkMenu from "./NavLink.tsx";


export default function HeaderMenu() {
    return (
        <>
            <ul className="flex justify-center items-center flex-wrap gap-5 cursor-pointer">
                <li className="px-2.5">
                    <NavLinkMenu link='/'>All recipes</NavLinkMenu>
                </li>
                <li className="relative group z-50 px-2.5">
                    <NavLinkMenu link='/categories'>Categories</NavLinkMenu>
                    <UlMenuItem>
                        <LiMenuItem>Item1</LiMenuItem>
                        <LiMenuItem>Item1</LiMenuItem>
                    </UlMenuItem>
                </li>
                <li className="relative group z-50 px-2.5">
                    <NavLinkMenu link='/meals'>Meals</NavLinkMenu>
                    <UlMenuItem>
                        <LiMenuItem>Item1</LiMenuItem>
                        <LiMenuItem>Item1</LiMenuItem>
                    </UlMenuItem>
                </li>
                <li className="relative group z-50 px-2.5">
                    <NavLinkMenu link='/cuisines'>Cuisines</NavLinkMenu>
                    <UlMenuItem>
                        <LiMenuItem>Item1</LiMenuItem>
                        <LiMenuItem>Item1</LiMenuItem>
                    </UlMenuItem></li>
                <li className="relative group z-50 px-2.5">
                    <NavLinkMenu link='/ingredients'>Ingredients</NavLinkMenu>
                    <UlMenuItem>
                        <LiMenuItem>Item1</LiMenuItem>
                        <LiMenuItem>Item1</LiMenuItem>
                    </UlMenuItem></li>
            </ul>

        </>
    )
}