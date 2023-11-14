import { jest, describe, it, beforeEach, expect } from "@jest/globals";
import { act, renderHook } from '@testing-library/react';
import useReviewModal from "@/hooks/feed/useReviewModal"; // Update the path as necessary
import { useDisclosure } from "@chakra-ui/react";

jest.mock("@chakra-ui/react", () => ({
    useDisclosure: jest.fn()
}));

describe("useReviewModal Hook", () => {
    let isOpen = false;
    const onOpen = jest.fn(() => (isOpen = true));
    const onClose = jest.fn(() => (isOpen = false));

    beforeEach(() => {
        (useDisclosure as jest.MockedFunction<typeof useDisclosure>).mockImplementation(() => ({
            isOpen: (() => isOpen)(),
            onOpen,
            onClose,
            onToggle: jest.fn(),
            isControlled: false,
            getButtonProps: jest.fn(),
            getDisclosureProps: jest.fn()
        }));
    });

    it("should handle opening and setting the review", () => {
        const { result } = renderHook(() => useReviewModal());
        const mockReviewId = "review1";

        act(() => {
            result.current.openModal(mockReviewId);
        });

        expect(onOpen).toHaveBeenCalled();
        expect(result.current.isOpen).toBe(true);
        expect(result.current.reviewId).toEqual(mockReviewId);
    });

    it("should handle closing the modal", () => {
        const { result } = renderHook(() => useReviewModal());
        const mockReviewId = "review1";

        // Open the modal first
        act(() => {
            result.current.openModal(mockReviewId);
        });

        // Then close it
        act(() => {
            result.current.onClose();
        });

        expect(onClose).toHaveBeenCalled();
        expect(result.current.isOpen).toBe(true);
    });
});
