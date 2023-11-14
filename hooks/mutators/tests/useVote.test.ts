import { jest, describe, it, expect, beforeEach, afterEach } from "@jest/globals";
import { renderHook, act } from '@testing-library/react';
import { useToast } from "@chakra-ui/react";
import { getToastMessage, getVoteIncrement } from "@/services/voteUtils";
import useVote from '@/hooks/mutators/useVote';
import {Vote, VoteInput, VoteStatus} from "@/types/Vote";

jest.mock("@chakra-ui/react", () => ({
    useToast: jest.fn(() => jest.fn())
}));

jest.mock("@/services/voteUtils", () => ({
    getToastMessage: jest.fn(),
    getVoteIncrement: jest.fn()
}));

describe('useVote', () => {
    const voteMock: jest.MockedFunction<(amountIncrement: number) => Promise<boolean>> =
        jest.fn((amountIncrement: number) => Promise.resolve(true));
    const updateVoteMock: jest.MockedFunction<(voteId: string, status: VoteStatus) => Promise<boolean>> =
        jest.fn((voteId: string, status: VoteStatus) => Promise.resolve(true));
    const addVoteMock: jest.MockedFunction<(vote: VoteInput) => Promise<boolean>> =
        jest.fn((vote: VoteInput) => Promise.resolve(true));
    const toast = jest.fn();

    beforeEach(() => {
        (useToast as jest.Mock).mockImplementation(jest.fn(() => toast));
        voteMock.mockResolvedValue(true);
        updateVoteMock.mockResolvedValue(true);
        addVoteMock.mockResolvedValue(true);
        (getVoteIncrement as jest.Mock).mockReturnValue(1);
        (getToastMessage as jest.Mock).mockReturnValue({ title: 'Voted', status: 'success' });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should handle upvotes correctly', async () => {
        const { result } = renderHook(() => useVote(
            'userId123',
            [],
            false,
            voteMock,
            updateVoteMock,
            addVoteMock
        ));

        await act(async () => {
            await result.current.onUpvote();
        });

        expect(voteMock).toHaveBeenCalledWith(1);
        expect(addVoteMock).toHaveBeenCalledWith({
            userId: 'userId123',
            voteStatus: VoteStatus.UPVOTED
        });
        expect(toast).toHaveBeenCalled();
    });

    it('should handle downvotes correctly', async () => {
        const { result } = renderHook(() => useVote(
            'userId123',
            [],
            false,
            voteMock,
            updateVoteMock,
            addVoteMock
        ));

        await act(async () => {
            await result.current.onDownvote();
        });

        expect(voteMock).toHaveBeenCalledWith(1);
        expect(addVoteMock).toHaveBeenCalledWith({
            userId: 'userId123',
            voteStatus: VoteStatus.DOWNVOTED
        });
        expect(toast).toHaveBeenCalledWith({ title: 'Voted', status: 'success' });
    });

    it('should handle vote updates correctly', async () => {
        const existingVotes: Vote[] = [
            {
                id: 'voteId123',
                voteStatus: VoteStatus.UPVOTED ,
                userId: 'userId123'
            }
        ];
        const { result } = renderHook(() => useVote(
            'userId123',
            existingVotes,
            false,
            voteMock,
            updateVoteMock,
            addVoteMock
        ));

        await act(async () => {
            await result.current.onDownvote();
        });

        expect(voteMock).toHaveBeenCalledWith(1);
        expect(updateVoteMock).toHaveBeenCalledWith('voteId123', VoteStatus.DOWNVOTED);
        expect(toast).toHaveBeenCalledWith({ title: 'Voted', status: 'success' });
    });

    it('should not perform any action if loading is true', async () => {
        const { result } = renderHook(() => useVote(
            'userId123',
            [],
            true, // loading is true
            voteMock,
            updateVoteMock,
            addVoteMock
        ));

        await act(async () => {
            await result.current.onUpvote();
        });

        expect(voteMock).not.toHaveBeenCalled();
        expect(addVoteMock).not.toHaveBeenCalled();
        expect(updateVoteMock).not.toHaveBeenCalled();
    });

    it('should not perform any action if userId is not provided', async () => {
        const { result } = renderHook(() => useVote(
            '', // no userId
            [],
            false,
            voteMock,
            updateVoteMock,
            addVoteMock
        ));

        await act(async () => {
            await result.current.onUpvote();
        });

        expect(voteMock).not.toHaveBeenCalled();
        expect(addVoteMock).not.toHaveBeenCalled();
        expect(updateVoteMock).not.toHaveBeenCalled();
    });

    it('should handle changing the vote to none if the same vote type is clicked', async () => {
        const existingVotes: Vote[] = [
            {
                id: 'voteId123',
                voteStatus: VoteStatus.UPVOTED,
                userId: 'userId123'
            }
        ];
        (getVoteIncrement as jest.Mock).mockReturnValue(0);
        const { result } = renderHook(() => useVote(
            'userId123',
            existingVotes,
            false,
            voteMock,
            updateVoteMock,
            addVoteMock
        ));

        await act(async () => {
            await result.current.onUpvote(); // Same vote type as existing vote
        });

        expect(voteMock).toHaveBeenCalledWith(0); // No increment since vote type is the same
        expect(updateVoteMock).toHaveBeenCalledWith('voteId123', VoteStatus.NONE); // Vote is set to none
        expect(toast).toHaveBeenCalledWith({ title: 'Voted', status: 'success' });
    });

    it('should return the current vote status if there are existing votes', async () => {
        const existingVotes: Vote[] = [
            {
                id: 'voteId123',
                voteStatus: VoteStatus.UPVOTED,
                userId: 'userId123'
            }
        ];
        const { result } = renderHook(() => useVote(
            'userId123',
            existingVotes,
            false,
            voteMock,
            updateVoteMock,
            addVoteMock
        ));

        // Asserting the initial state of voteStatus
        expect(result.current.voteStatus).toBe(VoteStatus.UPVOTED);
    });

    it('should return NONE as vote status if there are no existing votes', async () => {
        const { result } = renderHook(() => useVote(
            'userId123',
            [], // No existing votes
            false,
            voteMock,
            updateVoteMock,
            addVoteMock
        ));

        // Asserting the initial state of voteStatus
        expect(result.current.voteStatus).toBe(VoteStatus.NONE);
    });
});
