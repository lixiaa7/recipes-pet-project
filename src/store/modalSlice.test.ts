import {describe, expect, it} from "vitest";
import reducer, {closeModal, openModal} from "./modalSlice.ts";

describe("modalSlice", () => {
    it("opens and closes the modal", () => {
        const openedState = reducer(undefined, openModal());
        const closedState = reducer(openedState, closeModal());

        expect(openedState).toEqual({isOpen: true});
        expect(closedState).toEqual({isOpen: false});
    });
});
