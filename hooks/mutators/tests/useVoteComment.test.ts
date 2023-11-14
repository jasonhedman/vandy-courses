import { jest, describe, it, expect } from "@jest/globals";
import { renderHook, act } from '@testing-library/react';
import useAuth from "@/hooks/auth/useAuth";
import useCommentVotes from "@/hooks/queries/useCommentVotes";
import useVote from "@/hooks/mutators/useVote";
import useVoteComment from '@/hooks/mutators/useVoteComment';

import {Vote} from "@/types/Vote";

jest.mock("@/hooks/auth/useAuth", () => ({
    __esModule: true,
    default: jest.fn()
}));

jest.mock("@/hooks/queries/useCommentVotes", () => ({
    __esModule: true,
    default: jest.fn()
}));

// jest.mock("@/hooks/mutators/useVote", () => ({
//     __esModule: true,
//     default: jest.fn()
// }));

jest.mock("@/services/commentVotes", () => ({
    voteComment: jest.fn(),
    addCommentVote: jest.fn(),
    updateCommentVote: jest.fn()
}));

describe('useVoteComment', () => {
    it('calls useVote with correct parameters', () => {
        const mockUser = { uid: 'user123' };
        const mockVotes: Vote[] = [];
        const mockLoading = false;

        (useAuth as jest.Mock).mockReturnValue({ user: mockUser });
        (useCommentVotes as jest.Mock).mockReturnValue({ votes: mockVotes, loading: mockLoading });

        renderHook(() => useVoteComment('reviewId123', 'commentId123'));
    });

    it('performs an upvote when onUpvote is called', async () => {
        const mockUser = { uid: 'user123' };
        const mockVotes: Vote[] = [];
        const mockLoading = false;
        const reviewId = 'reviewId123';
        const commentId = 'commentId123';

        // Mock the useAuth hook to return a user
        (useAuth as jest.Mock).mockReturnValue({ user: mockUser });

        // Mock the useCommentVotes hook to return votes and loading state
        (useCommentVotes as jest.Mock).mockReturnValue({ votes: mockVotes, loading: mockLoading });

        // Render the hook
        const { result } = renderHook(() => useVoteComment(reviewId, commentId));

        await act(async () => {
            // Perform the upvote action
            await result.current.onUpvote();
        })
    });


});
