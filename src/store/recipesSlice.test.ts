import {describe, expect, it} from "vitest";
import reducer, {addRecipe, deleteRecipe, hydrateRecipes} from "./recipesSlice.ts";
import {createRecipe} from "../test/fixtures.ts";

describe("recipesSlice", () => {
    it("hydrates recipes only once and keeps local overrides", () => {
        const localRecipe = createRecipe({id: 1, name: "Local Pasta"});
        const remoteRecipe = createRecipe({id: 1, name: "Remote Pasta"});
        const remoteOnlyRecipe = createRecipe({id: 2, name: "Soup"});

        const withLocalRecipe = reducer(undefined, addRecipe(localRecipe));
        const hydratedState = reducer(withLocalRecipe, hydrateRecipes([remoteRecipe, remoteOnlyRecipe]));
        const secondHydration = reducer(hydratedState, hydrateRecipes([createRecipe({id: 3, name: "Ignored"})]));

        expect(hydratedState).toEqual({
            items: [localRecipe, remoteOnlyRecipe],
            hasHydrated: true,
        });
        expect(secondHydration).toEqual(hydratedState);
    });

    it("adds and deletes recipes", () => {
        const firstRecipe = createRecipe({id: 1});
        const secondRecipe = createRecipe({id: 2});

        const withRecipes = reducer(reducer(undefined, addRecipe(firstRecipe)), addRecipe(secondRecipe));
        const nextState = reducer(withRecipes, deleteRecipe(1));

        expect(nextState.items).toEqual([secondRecipe]);
    });

    it("assigns a new id when a created recipe collides with an existing one", () => {
        const existingRecipe = createRecipe({id: 51, name: "Existing"});
        const collidingRecipe = createRecipe({id: 51, name: "Created"});

        const nextState = reducer(
            reducer(undefined, hydrateRecipes([existingRecipe])),
            addRecipe(collidingRecipe),
        );

        expect(nextState.items).toEqual([
            existingRecipe,
            {
                ...collidingRecipe,
                id: 52,
            },
        ]);
    });
});
