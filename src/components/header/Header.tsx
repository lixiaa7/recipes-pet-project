import HeaderInput from "./HeaderInput.tsx";
import HeaderMenu from "./HeaderMenu.tsx";
import {AddRecipeButton} from "./AddRecipeButton.tsx";

export default function Header(openModal) {
    return (
        <header className="h-20 bg-stone-800 flex justify-center text-white gap-5 mb-2.5 items-center">
            <HeaderMenu />
            <HeaderInput/>
            <AddRecipeButton />
        </header>
    )
}