import { beforeEach, describe, it, expect, jest } from "@jest/globals";
import { renderHook } from '@testing-library/react';
import useCommentVotes from "@/hooks/queries/useCommentVotes"; // Update the path as necessary
import { useCollectionData } from "react-firebase-hooks/firestore";
import { query, where } from "@firebase/firestore";

jest.mock("@firebase/firestore", () => ({
    query: jest.fn(),
    where: jest.fn()
}));

jest.mock("react-firebase-hooks/firestore", () => ({
    useCollectionData: jest.fn()
}));

// Mock the commentVotesCollection function
jest.mock("@/firebase/firestore/converters/voteConverter", () => ({
    commentVotesCollection: jest.fn()
}));

describe("useCommentVotes Hook", () => {
    const mockUserId = "user123";
    const mockReviewId = "review123";
    const mockCommentId = "comment123";
    const mockVotes = [{ voteId: "vote1", score: 1 }, { voteId: "vote2", score: -1 }];

    beforeEach(() => {
        (useCollectionData as jest.Mock) = jest.fn(() => [mockVotes, false, null]);
        (require("@/firebase/firestore/converters/voteConverter").commentVotesCollection as jest.Mock) = jest.fn(() => ({}));
    });

    it("fetches comment votes data correctly", () => {
        const { result } = renderHook(() => useCommentVotes(mockUserId, mockReviewId, mockCommentId));

        expect(result.current.votes).toEqual(mockVotes);
        expect(result.current.loading).toBeFalsy();
        expect(result.current.error).toBeNull();
    });

    it("constructs query parameters correctly", () => {
        renderHook(() => useCommentVotes(mockUserId, mockReviewId, mockCommentId));

        expect(query).toHaveBeenCalled();
        expect(where).toHaveBeenCalledWith('userId', '==', mockUserId);
        expect(require("@/firebase/firestore/converters/voteConverter").commentVotesCollection).toHaveBeenCalledWith(mockReviewId, mockCommentId);
    });

    it("handles undefined votes data by defaulting to an empty array", () => {
        (useCollectionData as jest.Mock) = jest.fn(() => [undefined, false, null]);

        const { result } = renderHook(() => useCommentVotes(mockUserId, mockReviewId, mockCommentId));

        expect(result.current.votes).toEqual([]);
    });
});
