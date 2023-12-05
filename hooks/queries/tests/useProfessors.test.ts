import { beforeEach, describe, it, expect, jest } from "@jest/globals";
import { renderHook } from '@testing-library/react';
import useProfessors from "@/hooks/queries/useProfessors";
import { useHits, useSearchBox } from "react-instantsearch";

jest.mock("react-instantsearch", () => ({
    useHits: jest.fn(),
    useSearchBox: jest.fn()
}));

describe("useProfessors Hook", () => {
    const mockHits = [{ id: "prof1", name: "Professor 1" }, { id: "prof2", name: "Professor 2" }];
    const mockQuery = "search query";
    const mockRefine = jest.fn();

    beforeEach(() => {
        (useHits as jest.Mock).mockReturnValue({ hits: mockHits });
        (useSearchBox as jest.Mock).mockReturnValue({ query: mockQuery, refine: mockRefine });
    });

    it("returns hits from useHits", () => {
        const { result } = renderHook(() => useProfessors());

        expect(result.current.hits).toEqual(mockHits);
    });

    it("returns query and refine from useSearchBox", () => {
        const { result } = renderHook(() => useProfessors());

        expect(result.current.query).toBe(mockQuery);
        expect(result.current.refine).toBe(mockRefine);
    });
});
