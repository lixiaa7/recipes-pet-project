import HeaderInput from "./HeaderInput.tsx";
import HeaderMenu from "./HeaderMenu.tsx";

export default function Header() {
    return (
        <header className="h-18 bg-stone-800 flex justify-center text-white gap-5 mb-4">
            <HeaderMenu />
            <HeaderInput/>
        </header>
    )
}