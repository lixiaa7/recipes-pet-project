import {useState, type ChangeEvent, type FormEvent} from "react";
import {useSelector} from "react-redux";
import {LabelForm} from "./LabelForm.tsx";
import {InputForm} from "./InputForm.tsx";
import {AddedItem} from "./AddedItem.tsx";
import {mealTypes, cuisines} from "../constants/menuItems.tsx";
import {capitalize} from "../helpers/capitalize.ts";
import {validate} from "../helpers/validate.ts";
import type {RecipeForm} from "../types/RecipeForm.types.ts";
import {useAddRecipe} from "../hooks/useAddRecipe.ts";
import {useDispatch} from "react-redux";
import {closeModal} from "../store/modalSlice.ts";
import type {RootState} from "../store/store.ts";

type ListField = "ingredients" | "instructions";

const initialForm: RecipeForm = {
    name: "",
    difficulty: "medium",
    cookTimeMinutes: 20,
    image: "",
    mealType: [],
    ingredients: [],
    instructions: [],
    servings: 2,
    cuisine: "Asian",
    caloriesPerServing: 250,
    id: Date.now(),
    userId: Math.floor(Math.random() * 1000),
    rating: +(Math.random() + 4).toFixed(1),
    reviewCount: Math.floor(Math.random() * 1000),
};

export const NewRecipeForm = () => {
    const [ingredient, setIngredient] = useState("");
    const [ready, setReady] = useState(false);
    const [form, setForm] = useState<RecipeForm>(initialForm);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [step, setStep] = useState("");
    const dispatch = useDispatch();
    const addRecipeMutation = useAddRecipe();
    const data = useSelector((state: RootState) => state.recipes.items);

    const canAddString = (str: string) => str.trim().length > 0;

    const submitLabel = ready ? "Create recipe" : "Continue";

    function clearError(field: string) {
        setErrors((prev) => {
            if (!prev[field]) {
                return prev;
            }

            const nextErrors = {...prev};
            delete nextErrors[field];
            return nextErrors;
        });
    }

    function handleAddListItem(field: ListField, value: string, resetValue: () => void) {
        const trimmedValue = value.trim();

        if (!trimmedValue) {
            return;
        }

        setForm((prev) => ({
            ...prev,
            [field]: prev[field].includes(trimmedValue)
                ? prev[field]
                : [...prev[field], trimmedValue],
        }));
        resetValue();
        clearError(field);
    }

    function handleDeleteListItem(field: ListField, itemToDelete: string) {
        setForm((prev) => ({
            ...prev,
            [field]: prev[field].filter((item) => item !== itemToDelete),
        }));
    }

    function handleChange(
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
    ) {
        const {name, value} = event.target;
        const isNumber = !isNaN(Number(value));

        setForm((prev) => ({
            ...prev,
            [name]: isNumber ? +value : value,
        }));

        clearError(name);
    }

    function handleChangeMealType(event: ChangeEvent<HTMLInputElement>) {
        const {value, checked} = event.target;

        setForm((prev) => ({
            ...prev,
            mealType: checked
                ? [...prev.mealType, value]
                : prev.mealType.filter((item) => item !== value),
        }));
        clearError("mealType");
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const nextErrors = validate(form, ready);
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            return;
        }

        if (!ready) {
            setReady(true);
            return;
        }

        try {
            await addRecipeMutation.mutateAsync(form);
            dispatch(closeModal());
        } catch (error) {
            console.error("Failed to create recipe", error);
        }
    };
    console.log(data)

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
                <LabelForm
                    name="name"
                    label="Recipe title"
                    error={errors.name}
                    className="md:col-span-2"
                >
                    <InputForm
                        required
                        type="text"
                        name="name"
                        placeholder="Smoky tomato pasta"
                        value={form.name}
                        onChange={handleChange}
                    />
                </LabelForm>

                <LabelForm name="difficulty" label="Difficulty" error={errors.difficulty}>
                    <select
                        name="difficulty"
                        value={form.difficulty}
                        onChange={handleChange}
                        className="min-h-11 rounded-2xl border border-stone-200 bg-white px-4 text-sm text-stone-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                    >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                    </select>
                </LabelForm>

                <LabelForm
                    name="cookTimeMinutes"
                    label="Cooking time"
                    error={errors.cookTimeMinutes}
                >
                    <div className="relative">
                        <InputForm
                            type="number"
                            min="1"
                            name="cookTimeMinutes"
                            value={form.cookTimeMinutes}
                            onChange={handleChange}
                            placeholder="20"
                            className="pr-14"
                        />
                        <span
                            className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm text-stone-400">
                            min
                        </span>
                    </div>
                </LabelForm>

                <LabelForm
                    name="caloriesPerServing"
                    label="Calories per serving"
                    error={errors.caloriesPerServing}
                >
                    <InputForm
                        name="caloriesPerServing"
                        type="number"
                        min="1"
                        value={form.caloriesPerServing}
                        onChange={handleChange}
                        placeholder="250"
                        required
                    />
                </LabelForm>

                <LabelForm name="servings" label="Servings" error={errors.servings}>
                    <InputForm
                        name="servings"
                        type="number"
                        min="1"
                        value={form.servings}
                        required
                        onChange={handleChange}
                        placeholder="2"
                    />
                </LabelForm>

                <LabelForm name="image" label="Recipe image" error={errors.image} className="md:col-span-2">
                    <InputForm
                        type="url"
                        name="image"
                        value={form.image}
                        onChange={handleChange}
                        placeholder="https://images.example.com/recipe.jpg"
                    />
                </LabelForm>
            </div>

            <div className="rounded-[28px] border border-stone-200 bg-stone-50/80 p-5">
                <LabelForm name="mealType" label="Meal type" error={errors.mealType} className="w-full">
                    <div className="flex flex-wrap gap-3">
                        {mealTypes.map((meal) => (
                            <label
                                key={meal}
                                className={`inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                                    form.mealType.includes(meal)
                                        ? "border-orange-500 bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                                        : "border-stone-200 bg-white text-stone-700 hover:border-orange-300 hover:text-stone-950"
                                }`}
                            >
                                <input
                                    type="checkbox"
                                    name="mealType"
                                    value={meal}
                                    checked={form.mealType.includes(meal)}
                                    onChange={handleChangeMealType}
                                    className="sr-only"
                                />
                                {meal}
                            </label>
                        ))}
                    </div>
                </LabelForm>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
                <LabelForm name="cuisine" label="Cuisine" error={errors.cuisine}>
                    <select
                        name="cuisine"
                        value={form.cuisine}
                        onChange={handleChange}
                        className="min-h-11 rounded-2xl border border-stone-200 bg-white px-4 text-sm text-stone-800 outline-none transition focus:border-orange-400 focus:ring-4 focus:ring-orange-100"
                    >
                        {cuisines.map((cuisine) => (
                            <option key={cuisine} value={cuisine}>
                                {capitalize(cuisine)}
                            </option>
                        ))}
                    </select>
                </LabelForm>

                <LabelForm
                    name="ingredients"
                    label="Ingredients"
                    error={errors.ingredients}
                    className="md:col-span-2"
                >
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-3 sm:flex-row">
                            <InputForm
                                name="ingredient"
                                type="text"
                                onChange={(event) => setIngredient(event.target.value)}
                                value={ingredient}
                                placeholder="Type an ingredient"
                            />
                            <button
                                className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-stone-900 px-5 text-sm font-semibold text-stone-900 transition hover:border-orange-500 hover:text-orange-600 disabled:cursor-not-allowed disabled:border-stone-200 disabled:text-stone-400"
                                type="button"
                                onClick={() => handleAddListItem("ingredients", ingredient, () => setIngredient(""))}
                                disabled={!canAddString(ingredient)}
                            >
                                Add ingredient
                            </button>
                        </div>

                        <div className="flex min-h-12 flex-wrap gap-2">
                            {form.ingredients.length > 0 ? (
                                form.ingredients.map((item) => (
                                    <AddedItem key={item} onRemove={() => handleDeleteListItem("ingredients", item)}>
                                        {item}
                                    </AddedItem>
                                ))
                            ) : (
                                <p className="text-sm text-stone-400">
                                    Add a few ingredients to build the recipe card.
                                </p>
                            )}
                        </div>
                    </div>
                </LabelForm>
            </div>

            {ready && (
                <div className="rounded-[28px] border border-orange-200 bg-linear-to-br from-orange-50 to-amber-50 p-5">
                    <LabelForm
                        name="instructions"
                        label="Cooking instructions"
                        error={errors.instructions}
                        className="w-full"
                    >
                        <InputForm
                            name="instructions"
                            type="text"
                            onChange={(event) => setStep(event.target.value)}
                            value={step}
                            placeholder={`Step ${form.instructions.length + 1}: Type an instruction`}
                        />
                        <button
                            className="inline-flex min-h-11 items-center justify-center rounded-2xl border border-stone-900 px-5 text-sm font-semibold text-stone-900 transition hover:border-orange-500 hover:text-orange-600 disabled:cursor-not-allowed disabled:border-stone-200 disabled:text-stone-400"
                            type="button"
                            onClick={() => handleAddListItem("instructions", step, () => setStep(""))}
                            disabled={!canAddString(step)}
                        >
                            Add {form.instructions.length + 1} step
                        </button>

                        <div className="mt-2 flex flex-col gap-3">
                            {form.instructions.length > 0 ? (
                                form.instructions.map((item, i) => (
                                    <div
                                        key={item}
                                        className="flex items-start gap-3 rounded-3xl border border-orange-200 bg-white/90 px-4 py-3 shadow-sm"
                                    >
                                        <span
                                            className="inline-flex min-h-9 min-w-9 items-center justify-center rounded-full bg-orange-500 px-2 text-sm font-semibold text-white">
                                            {i + 1}
                                        </span>
                                        <p className="flex-1 pt-1 text-sm leading-6 text-stone-700">
                                            {item}
                                        </p>
                                        <button
                                            type="button"
                                            onClick={() => handleDeleteListItem("instructions", item)}
                                            className="inline-flex min-h-9 items-center justify-center rounded-full bg-orange-100 px-3 text-xs font-semibold uppercase tracking-[0.08em] text-orange-700 transition hover:bg-orange-500 hover:text-white"
                                            aria-label={`Remove step ${i + 1}`}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <p className="rounded-3xl border border-dashed border-orange-200 bg-white/70 px-4 py-4 text-sm text-stone-500">
                                    Add step-by-step instructions so the recipe is easy to follow.
                                </p>
                            )}
                        </div>
                    </LabelForm>
                </div>
            )}

            <div
                className="flex flex-col gap-3 border-t border-stone-200 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-stone-500">
                    {ready
                        ? "Final step: add instructions and create the recipe."
                        : "Fill the basics first, then continue to instructions."}
                </p>
                <button
                    type="submit"
                    disabled={addRecipeMutation.isPending}
                    className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-stone-950 px-6 text-sm font-semibold text-white shadow-lg shadow-stone-950/15 transition hover:-translate-y-0.5 hover:bg-orange-500"
                >
                    {addRecipeMutation.isPending ? "Creating..." : submitLabel}
                </button>
            </div>
        </form>
    );
};
