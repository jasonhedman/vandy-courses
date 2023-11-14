import { describe, it, expect, jest, beforeEach } from "@jest/globals";
import {act, renderHook} from '@testing-library/react';
import useComments from "@/hooks/queries/useComments"; // Update the path as necessary
import { query, orderBy } from "@firebase/firestore";
import {SortBy} from "@/types/SortBy";
import {useCollectionData} from "react-firebase-hooks/firestore";

jest.mock("@firebase/firestore", () => ({
    query: jest.fn(),
    orderBy: jest.fn()
}));

jest.mock("react-firebase-hooks/firestore", () => ({
    useCollectionData: jest.fn()
}));

jest.mock("@/firebase/firestore/converters/commentConverter", () => ({
    __esModule: true,
    default: jest.fn(() => ({
        withConverter: jest.fn()
    }))
}));

describe("useComments Hook", () => {

    const mockReviewId = "review123";
    const mockComments = [
        { id: "comment1", content: "Great comment", createdAt: new Date(), score: 5 },
        { id: "comment2", content: "Insightful comment", createdAt: new Date(), score: 10 }
    ];

    beforeEach(() => {
        (useCollectionData as jest.Mock).mockReturnValue([mockComments, false, null]);
    });

    it("fetches comments data correctly", () => {
        const { result } = renderHook(() => useComments(mockReviewId));

        expect(result.current.comments).toEqual(mockComments);
        expect(result.current.loading).toBeFalsy();
        expect(result.current.error).toBeNull();
    });

    it("handles undefined comments data by defaulting to an empty array", () => {
        (useCollectionData as jest.Mock).mockReturnValue([undefined, false, null]);

        const { result } = renderHook(() => useComments(mockReviewId));

        expect(result.current.comments).toEqual([]);
    });

    it("updates query when sortBy changes", () => {
        const { result, rerender } = renderHook(() => useComments(mockReviewId));

        act(() => {
            result.current.setSortBy(SortBy.MostPopular);
        });
        rerender();

        expect(query).toHaveBeenCalledWith(
            expect.anything(),
            orderBy('score', 'desc')
        );
    });
});
