import { beforeEach, describe, it, expect, jest } from "@jest/globals";
import { renderHook } from '@testing-library/react';
import useReview from "@/hooks/queries/useReview"; // Update the path as necessary
import { useDocumentData } from "react-firebase-hooks/firestore";

jest.mock("react-firebase-hooks/firestore", () => ({
    useDocumentData: jest.fn()
}));

// Mock the reviewDocument function
jest.mock("@/firebase/firestore/converters/reviewConverter", () => ({
    reviewDocument: jest.fn()
}));

describe("useReview Hook", () => {
    const mockReviewId = "review123";
    const mockReview = { id: mockReviewId, content: "Informative review" };

    beforeEach(() => {
        (useDocumentData as jest.Mock) = jest.fn(() => [mockReview, false, null]);
        (require("@/firebase/firestore/converters/reviewConverter").reviewDocument as jest.Mock) = jest.fn(() => ({}));
    });

    it("fetches review data correctly", () => {
        const { result } = renderHook(() => useReview(mockReviewId));

        expect(result.current.review).toEqual(mockReview);
        expect(result.current.loading).toBeFalsy();
        expect(result.current.error).toBeNull();
    });

    it("calls reviewDocument with correct reviewId", () => {
        renderHook(() => useReview(mockReviewId));

        expect(require("@/firebase/firestore/converters/reviewConverter").reviewDocument).toHaveBeenCalledWith(mockReviewId);
    });
});