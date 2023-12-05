import { beforeEach, describe, it, expect, jest } from "@jest/globals";
import { renderHook } from '@testing-library/react';
import useCourses from "@/hooks/queries/useCourses";
import { useHits, useSearchBox } from "react-instantsearch";

jest.mock("react-instantsearch", () => ({
    useHits: jest.fn(),
    useSearchBox: jest.fn()
}));

describe("useCourses Hook", () => {
    const mockHits = [{ id: "course1", name: "Course 1" }, { id: "course2", name: "Course 2" }];
    const mockQuery = "test query";
    const mockRefine = jest.fn();

    beforeEach(() => {
        (useHits as jest.Mock).mockReturnValue({ hits: mockHits });
        (useSearchBox as jest.Mock).mockReturnValue({ query: mockQuery, refine: mockRefine });
    });

    it("returns hits from useHits", () => {
        const { result } = renderHook(() => useCourses());

        expect(result.current.hits).toEqual(mockHits);
    });

    it("returns query and refine from useSearchBox", () => {
        const { result } = renderHook(() => useCourses());

        expect(result.current.query).toBe(mockQuery);
        expect(result.current.refine).toBe(mockRefine);
    });
});
