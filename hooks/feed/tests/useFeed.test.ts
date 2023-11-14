import {describe, expect, it, jest, beforeEach} from "@jest/globals";
import {act, renderHook} from '@testing-library/react';
import useFeed from "@/hooks/feed/useFeed"; // Adjust the path to your useFeed hook
import useReviews from "@/hooks/queries/useReviews";
import {SortBy} from "@/types/SortBy";

jest.mock("@/hooks/queries/useReviews", () => ({
    __esModule: true,
    default: jest.fn(),
}));

// Define a mock implementation of useReviews
const mockUseReviews = {
    reviews: [], // Replace with mock data as needed
    loading: false,
    error: undefined,
    sortBy: SortBy.Newest, // Example sorting criteria
    setSortBy: jest.fn(),
}

describe("useFeed Hook", () => {
    beforeEach(() => {
        (useReviews as jest.MockedFunction<typeof useReviews>).mockReturnValue(mockUseReviews);
    });

    it("initializes correctly", () => {
        const { result } = renderHook(() => useFeed());

        expect(result.current.courseId).toBeNull();
        expect(result.current.professor).toBeNull();
        expect(result.current.reviews).toEqual(mockUseReviews.reviews);
        expect(result.current.loading).toBe(mockUseReviews.loading);
        expect(result.current.error).toBe(mockUseReviews.error);
        expect(result.current.sortBy).toBe(mockUseReviews.sortBy);
    });

    it("updates courseId and professor correctly", () => {
        const { result } = renderHook(() => useFeed());
        const newCourseId = "course2";
        const newProfessor = { id: "prof1", name: "Prof. Smith" };

        act(() => {
            result.current.setCourseId(newCourseId);
            result.current.setProfessor(newProfessor);
        });

        expect(result.current.courseId).toBe(newCourseId);
        expect(result.current.professor).toEqual(newProfessor);
    });

    it("updates sorting correctly", () => {
        const { result } = renderHook(() => useFeed());
        const newSortBy = SortBy.MostPopular;

        act(() => {
            result.current.setSortBy(newSortBy);
        });

        expect(mockUseReviews.setSortBy).toHaveBeenCalledWith(newSortBy);
        expect(result.current.sortBy).toBe(SortBy.Newest);
    });
});
