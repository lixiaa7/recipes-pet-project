export default function HeaderInput() {
    return (
        <div className="w-1/4 flex justify-center items-center">
            <input type="text" placeholder="Search recipes"
                   className="w-full p-1.5 border-amber-50 border-b focus:text-orange-500 rounded"/>
        </div>
    )
}