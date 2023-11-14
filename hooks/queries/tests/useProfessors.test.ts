import { beforeEach, describe, it, expect, jest } from "@jest/globals";
import { renderHook } from '@testing-library/react';
import useProfessors from "@/hooks/queries/useProfessors"; // Update the path as necessary
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

    it("fetches professors data correctly", () => {
        const { result } = renderHook(() => useProfessors());

        expect(result.current.professors).toEqual(mockProfessors);
        expect(result.current.loading).toBeFalsy();
        expect(result.current.error).toBeNull();
    });

    it("handles undefined professors data by defaulting to an empty array", () => {
        (useCollectionDataOnce as jest.Mock).mockReturnValue([undefined, false, null]);

        const { result } = renderHook(() => useProfessors());

        expect(result.current.professors).toEqual([]);
    });
});
