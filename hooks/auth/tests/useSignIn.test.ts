import { beforeEach, describe, it, expect, jest } from "@jest/globals";
import { act, renderHook } from '@testing-library/react';
import { signInWithPopup } from "firebase/auth";
import useSignIn from "@/hooks/auth/useSignIn";

// Mock Firebase auth functions and react-firebase-hooks
jest.mock("firebase/auth", () => ({
    GoogleAuthProvider: jest.fn(() => ({
        setCustomParameters: jest.fn()
    })),
    signInWithPopup: jest.fn()
}));
jest.mock("react-firebase-hooks/auth", () => ({
    useAuthState: jest.fn()
}));
jest.mock('@/firebase/auth', () => ({}));

describe("useSignIn Hook", () => {
    const mockUser = { uid: '123', email: 'user@example.com' }; // Mock user object

    beforeEach(() => {
        (require('react-firebase-hooks/auth').useAuthState as jest.Mock) = jest.fn(() => [mockUser, false, null]);
        (signInWithPopup as jest.Mock) = jest.fn();
    });

    it('initially sets the user correctly', () => {
        const { result } = renderHook(() => useSignIn());
        expect(result.current.user).toEqual(mockUser);
        expect(result.current.loading).toBeFalsy();
        expect(result.current.error).toBeNull();
    });

    it('calls signInWithPopup on sign-in', async () => {
        (signInWithPopup as jest.Mock) = jest.fn(() => Promise.resolve({ user: mockUser }));

        const { result } = renderHook(() => useSignIn());

        await act(async () => {
            await result.current.onSignIn();
        });

        expect(signInWithPopup).toHaveBeenCalled();
    });

    it('handles errors during sign-in', async () => {
        (signInWithPopup as jest.Mock) = jest.fn(() => Promise.reject(new Error('Sign-in failed')));

        const { result } = renderHook(() => useSignIn());

        let error;
        await act(async () => {
            try {
                await result.current.onSignIn();
            } catch (e) {
                error = e;
            }
        });

        expect(error).toBeDefined();
    });

    // Additional tests...
});
