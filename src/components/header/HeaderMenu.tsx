import LiMenuHeaderItem from "./LiMenuHeaderItem.tsx";
import UlMenuItemHeader from "./UlMenuItemHeader.tsx";
import NavLinkMenu from "../NavLink.tsx";
import {cuisine, mealTypes, ingredients} from "../../constants/menuItems.tsx";


export default function HeaderMenu() {
    return (
        <>
            <ul className="flex justify-center items-center flex-wrap gap-5 cursor-pointer">
                <li className="px-2.5">
                    <NavLinkMenu link='/'>All recipes</NavLinkMenu>
                </li>
                <li className="relative group z-50 px-2.5">
                    <NavLinkMenu link='/meals'>Meals</NavLinkMenu>
                    <UlMenuItemHeader>
                        {mealTypes.map(meal => (
                            <LiMenuHeaderItem mainCategory="meals" category={meal} key={meal}>{meal}</LiMenuHeaderItem>
                        ))}
                        <LiMenuHeaderItem mainCategory="meals">View All</LiMenuHeaderItem>
                    </UlMenuItemHeader>
                </li>
                <li className="relative group z-50 px-2.5">
                    <NavLinkMenu link='/cuisines'>Cuisines</NavLinkMenu>
                    <UlMenuItemHeader>
                        {cuisine.map((cuisine: string) => (
                            <LiMenuHeaderItem key={cuisine} mainCategory="cuisines"  category={cuisine}>{cuisine}</LiMenuHeaderItem>
                        ))}
                        <LiMenuHeaderItem mainCategory="cuisines">View All</LiMenuHeaderItem>
                    </UlMenuItemHeader></li>
                <li className="relative group z-50 px-2.5">
                    <NavLinkMenu link='/ingredients'>Ingredients</NavLinkMenu>
                    <UlMenuItemHeader>
                        {ingredients.map((ingredient) => (
                            <LiMenuHeaderItem key={ingredient} category={ingredient}  mainCategory="ingredients">{ingredient}</LiMenuHeaderItem>
                        ))}
                        <LiMenuHeaderItem mainCategory="ingredients">View All</LiMenuHeaderItem>
                    </UlMenuItemHeader></li>
            </ul>

        </>
    )
}