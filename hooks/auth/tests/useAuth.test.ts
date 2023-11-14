import {beforeEach, describe, expect, it, jest} from "@jest/globals";

import {act, renderHook} from '@testing-library/react';

import {User} from "@firebase/auth";

import useAuth from '@/hooks/auth/useAuth';


// Mock react-firebase-hooks/auth and Firebase auth
jest.mock('@/firebase/auth', () => ({}));
jest.mock('react-firebase-hooks/auth', () => ({
    useAuthState: jest.fn(),
    useSignOut: jest.fn(),
}));

describe('useAuth Hook', () => {
    // Mock user data
    const mockRawUser: User = { uid: '123', email: 'user@example.com' } as User; // Cast as User for typing

    beforeEach(() => {
        (require('react-firebase-hooks/auth').useAuthState as jest.Mock) = jest.fn(() => [mockRawUser, false, null]);

        const signOutMock = jest.fn(() => Promise.resolve());
        (require('react-firebase-hooks/auth').useSignOut as jest.Mock) = jest.fn(() => [signOutMock, false, null]);
    });

    it('initially sets the user correctly', () => {
        const { result } = renderHook(() => useAuth());
        expect(result.current.user).toEqual(mockRawUser);
        expect(result.current.isConnected).toBeTruthy();
        expect(result.current.loading).toBeFalsy();
        expect(result.current.error).toBeNull();
    });

    it('updates the user state when rawUser changes', () => {
        const { result, rerender } = renderHook(() => useAuth());

        act(() => {
            const newMockRawUser: User = { uid: '456', email: 'newuser@example.com' } as User; // Cast as User for typing
            const useAuthStateMock = require('react-firebase-hooks/auth').useAuthState as jest.Mock;
            useAuthStateMock.mockReturnValue([newMockRawUser, false, null]);
            rerender();
        });

        expect(result.current.user).toEqual({ uid: '456', email: 'newuser@example.com' });
    });

    it('onSignOut returns true when successful', async () => {
        const { result } = renderHook(() => useAuth());

        await act(async () => {
            const signOutSuccess = await result.current.onSignOut();
            expect(signOutSuccess).toBeTruthy();
        });
    });

    it('onSignOut returns false when there is an error', async () => {
        const signOutMockError = jest.fn(() => Promise.reject(new Error('Sign out failed')));
        (require('react-firebase-hooks/auth').useSignOut as jest.Mock) = jest.fn(() => [signOutMockError, false, null]);

        const { result } = renderHook(() => useAuth());

        await act(async () => {
            const signOutSuccess = await result.current.onSignOut();
            expect(signOutSuccess).toBeFalsy();
        });
    });
});
