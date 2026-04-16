import LiMenuHeaderItem from "./LiMenuHeaderItem.tsx";
import UlMenuItemHeader from "./UlMenuItemHeader.tsx";
import NavLinkMenu from "../NavLink.tsx";
import {cuisine, mealTypes, ingredients} from "../../constants/menuItems.tsx";

type HeaderMenuProps = {
    mobile?: boolean;
    drawer?: boolean;
    onItemClick?: () => void;
};

export default function HeaderMenu({mobile = false, drawer = false, onItemClick}: HeaderMenuProps) {
    return (
        <ul className={mobile
            ? drawer
                ? "flex flex-col items-start gap-5"
                : "flex items-center gap-2.5 overflow-x-auto whitespace-nowrap pr-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden min-[640px]:gap-3"
            : "flex justify-center items-center flex-wrap gap-5 cursor-pointer"}
        >
            <li className={mobile ? "" : "px-2.5"}>
                <NavLinkMenu link='/' onClick={onItemClick} className={drawer ? "text-base tracking-[0.08em]" : ""}>All recipes</NavLinkMenu>
            </li>
            <li className={`relative group ${mobile ? "" : "z-50 px-2.5"}`}>
                <NavLinkMenu link='/meals' onClick={onItemClick} className={drawer ? "text-base tracking-[0.08em]" : ""}>Meals</NavLinkMenu>
                {!mobile && (
                    <UlMenuItemHeader>
                        {mealTypes.map(meal => (
                            <LiMenuHeaderItem mainCategory="meals" category={meal} key={meal}>{meal}</LiMenuHeaderItem>
                        ))}
                        <LiMenuHeaderItem mainCategory="meals">View All</LiMenuHeaderItem>
                    </UlMenuItemHeader>
                )}
            </li>
            <li className={`relative group ${mobile ? "" : "z-50 px-2.5"}`}>
                <NavLinkMenu link='/cuisines' onClick={onItemClick} className={drawer ? "text-base tracking-[0.08em]" : ""}>Cuisines</NavLinkMenu>
                {!mobile && (
                    <UlMenuItemHeader>
                        {cuisine.map((cuisine: string) => (
                            <LiMenuHeaderItem key={cuisine} mainCategory="cuisines" category={cuisine}>{cuisine}</LiMenuHeaderItem>
                        ))}
                        <LiMenuHeaderItem mainCategory="cuisines">View All</LiMenuHeaderItem>
                    </UlMenuItemHeader>
                )}
            </li>
            <li className={`relative group ${mobile ? "" : "z-50 px-2.5"}`}>
                <NavLinkMenu link='/ingredients' onClick={onItemClick} className={drawer ? "text-base tracking-[0.08em]" : ""}>Ingredients</NavLinkMenu>
                {!mobile && (
                    <UlMenuItemHeader>
                        {ingredients.map((ingredient) => (
                            <LiMenuHeaderItem key={ingredient} category={ingredient} mainCategory="ingredients">{ingredient}</LiMenuHeaderItem>
                        ))}
                        <LiMenuHeaderItem mainCategory="ingredients">View All</LiMenuHeaderItem>
                    </UlMenuItemHeader>
                )}
            </li>
        </ul>
    )
}
