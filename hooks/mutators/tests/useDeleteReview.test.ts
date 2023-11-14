import {jest, describe, it, expect, beforeEach} from "@jest/globals";

import { renderHook, act } from '@testing-library/react';
import useAuth from "@/hooks/auth/useAuth";
import { deleteReview } from "@/services/reviews";
import { useToast } from "@chakra-ui/react";
import useDeleteReview from '@/hooks/mutators/useDeleteReview';

jest.mock('@/hooks/auth/useAuth', () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock('@/services/reviews', () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock('@chakra-ui/react', () => ({
    __esModule: true,
    useToast: jest.fn()
}));

describe('useDeleteReview', () => {
    const reviewId = 'review123';
    const mockToast = jest.fn();
    (useToast as jest.Mock).mockImplementation(() => (jest.fn));
    (deleteReview as jest.Mock<typeof deleteReview>) = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();

        (useAuth as jest.Mock).mockReturnValue({ user: null });
    });

    it('initially sets loading and isDeleted to false', () => {
        const { result } = renderHook(() => useDeleteReview(reviewId));

        expect(result.current.loading).toBe(false);
        expect(result.current.isDeleted).toBe(false);
    });

    it('sets loading to true when delete operation begins', async () => {
        (useAuth as jest.Mock).mockReturnValue({ user: { uid: 'user123' } });

        const { result } = renderHook(() => useDeleteReview(reviewId));

        act(() => {
            result.current.onDelete();
        });
    });

    it('calls deleteReview and displays success toast when deletion is successful', async () => {
        (useAuth as jest.Mock).mockReturnValue({ user: { uid: 'user123' } });

        const { result } = renderHook(() => useDeleteReview(reviewId));

        await act(async () => {
            await result.current.onDelete();
        });

        expect(deleteReview).toHaveBeenCalledWith(reviewId);
        expect(result.current.isDeleted).toBe(true);
        expect(mockToast).toHaveBeenCalledWith({
            title: "Review deleted.",
            description: "Your review has been deleted.",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    });

    it('does not call deleteReview when user is not authenticated', async () => {
        (useAuth as jest.Mock).mockReturnValue({ user: null });

        const { result } = renderHook(() => useDeleteReview(reviewId));

        await act(async () => {
            await result.current.onDelete();
        });

        expect(deleteReview).not.toHaveBeenCalled();
    });

    it('displays error toast when deletion fails', async () => {
        (useAuth as jest.Mock).mockReturnValue({ user: { uid: 'user123' } });
        (deleteReview as jest.Mock<typeof deleteReview>).mockResolvedValue(false);

        const { result } = renderHook(() => useDeleteReview(reviewId));

        await act(async () => {
            await result.current.onDelete();
        });

        expect(mockToast).toHaveBeenCalledWith({
            title: "Review not deleted.",
            description: "Your review could not be deleted.",
            status: "error",
            duration: 5000,
            isClosable: true,
        });
    });
});
