interface RecipeItem {
    name: string;
    image: string;
    // instructions: string[];
    // ingredients: string[];
}

export default function RecipeItem({recipe} : RecipeItem ) {

    return (
        <>
                <img src={recipe.image} alt={recipe.name} className="rounded-tl-2xl rounded-tr-2xl"/>
                <p className="p-2">{recipe.name}</p>
        </>

    )
}