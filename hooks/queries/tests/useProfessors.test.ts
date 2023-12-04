import { beforeEach, describe, jest } from "@jest/globals";

import { useCollectionDataOnce } from "react-firebase-hooks/firestore";

jest.mock("react-firebase-hooks/firestore", () => ({
    useCollectionDataOnce: jest.fn()
}));

// Mock the professorsCollection
jest.mock("@/firebase/firestore/converters/professorConverter", () => ({
    professorsCollection: {}
}));

describe("useProfessors Hook", () => {
    const mockProfessors = [
        { id: "prof1", name: "Professor 1" },
        { id: "prof2", name: "Professor 2" }
    ];

    beforeEach(() => {
        (useCollectionDataOnce as jest.Mock) = jest.fn(() => [mockProfessors, false, null]);
    });
});
