export async function fetchRecipes() {
    const res = await fetch('https://dummyjson.com/recipes');

    if (!res.ok) {
        throw new Error('Failed to fetch recipes');
    }
    const data = await res.json();

    return data.recipes;
}