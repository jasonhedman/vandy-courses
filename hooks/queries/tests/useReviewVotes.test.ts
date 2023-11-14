import { beforeEach, describe, it, expect, jest } from "@jest/globals";
import { renderHook } from '@testing-library/react';
import useReviewVotes from "@/hooks/queries/useReviewVotes"; // Update the path as necessary
import { useCollectionData } from "react-firebase-hooks/firestore";

jest.mock("@firebase/firestore", () => ({
    query: jest.fn(),
    where: jest.fn()
}));

jest.mock("react-firebase-hooks/firestore", () => ({
    useCollectionData: jest.fn()
}));

// Mock the reviewVotesCollection function
jest.mock("@/firebase/firestore/converters/voteConverter", () => ({
    reviewVotesCollection: jest.fn()
}));

describe("useReviewVotes Hook", () => {
    const mockUserId = "user123";
    const mockReviewId = "review123";
    const mockVotes = [{ voteId: "vote1", score: 1 }, { voteId: "vote2", score: -1 }];

    beforeEach(() => {
        (useCollectionData as jest.Mock) = jest.fn(() => [mockVotes, false, null]);
        (require("@/firebase/firestore/converters/voteConverter").reviewVotesCollection as jest.Mock) = jest.fn(() => ({}));
    });

    it("fetches review votes data correctly", () => {
        const { result } = renderHook(() => useReviewVotes(mockUserId, mockReviewId));

        expect(result.current.votes).toEqual(mockVotes);
        expect(result.current.loading).toBeFalsy();
        expect(result.current.error).toBeNull();
    });

    it("handles undefined votes data by defaulting to an empty array", () => {
        (useCollectionData as jest.Mock).mockReturnValue([undefined, false, null]);

        const { result } = renderHook(() => useReviewVotes(mockUserId, mockReviewId));

        expect(result.current.votes).toEqual([]);
    });

    it("calls reviewVotesCollection with correct reviewId", () => {
        renderHook(() => useReviewVotes(mockUserId, mockReviewId));

        expect(require("@/firebase/firestore/converters/voteConverter").reviewVotesCollection).toHaveBeenCalledWith(mockReviewId);
    });
});
