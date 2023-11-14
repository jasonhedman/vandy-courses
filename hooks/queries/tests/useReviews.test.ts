import { beforeEach, describe, it, expect, jest } from "@jest/globals";
import { renderHook, act } from '@testing-library/react';
import useReviews from "@/hooks/queries/useReviews";
import { orderBy, query, where } from "@firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {SortBy} from "@/types/SortBy";

jest.mock("@firebase/firestore", () => ({
    orderBy: jest.fn(),
    query: jest.fn(),
    where: jest.fn()
}));

jest.mock("react-firebase-hooks/firestore", () => ({
    useCollectionData: jest.fn()
}));

// Mock the reviewsCollection
jest.mock("@/firebase/firestore/converters/reviewConverter", () => ({
    reviewsCollection: {}
}));

describe("useReviews Hook", () => {
    const mockReviews = [{ id: "review1", content: "Great course!" }, { id: "review2", content: "Very challenging." }];

    beforeEach(() => {
        (useCollectionData as jest.Mock) = jest.fn(() => [mockReviews, false, null]);
    });

    it("initializes correctly and fetches reviews", () => {
        const { result } = renderHook(() => useReviews({
            courseId: "course123",
            professor: null
        }));

        expect(result.current.reviews).toEqual(mockReviews);
        expect(result.current.loading).toBeFalsy();
        expect(result.current.error).toBeNull();
    });

    it("constructs query parameters correctly for courseId", () => {
        renderHook(() => useReviews({
            courseId: "course123",
            professor: null
        }));

        expect(query).toHaveBeenCalled();
        expect(orderBy).toHaveBeenCalledWith('createdAt', 'desc');
        expect(where).toHaveBeenCalledWith("courseId", "==", "course123");
    });

    it("constructs query parameters correctly for professor", () => {
        const mockProfessor = { id: "prof123", name: "Professor X" };
        renderHook(() => useReviews({
            courseId: null,
            professor: mockProfessor
        }));

        expect(query).toHaveBeenCalled();
        expect(orderBy).toHaveBeenCalledWith('createdAt', 'desc');
        expect(where).toHaveBeenCalledWith("professor.id", "==", "prof123");
    });

    it("handles undefined reviews data by defaulting to an empty array", () => {
        (useCollectionData as jest.Mock).mockReturnValue([undefined, false, null]);

        const { result } = renderHook(() => useReviews({
            courseId: "course123",
            professor: null
        }));

        expect(result.current.reviews).toEqual([]);
    });

    it("updates query parameters correctly when sortBy is changed to MostPopular", () => {
        const { result, rerender } = renderHook(() => useReviews({
            courseId: "course123",
            professor: null
        }));

        act(() => {
            result.current.setSortBy(SortBy.MostPopular);
        });
        rerender();

        expect(query).toHaveBeenCalled();
        expect(orderBy).toHaveBeenCalledWith('score', 'desc');
    });
});

