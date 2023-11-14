import {describe, expect, it, jest} from "@jest/globals";

import {addDoc, doc, DocumentReference, updateDoc} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {addReviewVote, updateReviewVote} from "@/services/reviewVotes";
import {VoteInput, VoteStatus} from "@/types/Vote";

jest.mock("@firebase/firestore", () => ({
    addDoc: jest.fn(),
    collection: jest.fn(),
    doc: jest.fn(),
    updateDoc: jest.fn(),
}));

jest.mock("@/firebase/firestore", () => ({}));

describe('Review Vote Services', () => {
    const reviewId = 'review1';
    const voteId = 'vote1';
    const mockVoteInput: VoteInput = {
        userId: 'user1',
        voteStatus: VoteStatus.UPVOTED,
    };

    // Mock DocumentReference
    const mockDocRef: DocumentReference = {
        id: voteId,
    } as DocumentReference;

    describe('addReviewVote', () => {
        it('adds a vote and updates the ID successfully', async () => {
            (addDoc as jest.MockedFunction<typeof addDoc>).mockResolvedValueOnce(mockDocRef);
            (updateDoc as jest.MockedFunction<typeof updateDoc>).mockResolvedValueOnce(undefined);

            const result = await addReviewVote(reviewId, mockVoteInput);

            expect(result).toBe(true);
            expect(addDoc).toHaveBeenCalled();
            expect(updateDoc).toHaveBeenCalledWith(mockDocRef, { id: voteId });
        });

        it('handles errors when adding a vote', async () => {
            (addDoc as jest.MockedFunction<typeof addDoc>).mockRejectedValueOnce(new Error('Failed to add document'));

            const result = await addReviewVote(reviewId, mockVoteInput);

            expect(result).toBe(false);
        });
    });

    describe('updateReviewVote', () => {
        it('successfully updates the vote status', async () => {
            (updateDoc as jest.MockedFunction<typeof updateDoc>).mockResolvedValueOnce(undefined);

            const result = await updateReviewVote(reviewId, voteId, VoteStatus.DOWNVOTED);

            expect(result).toBe(true);
            expect(updateDoc).toHaveBeenCalledWith(
                doc(firestore, 'reviews', reviewId, 'votes', voteId),
                { voteStatus: VoteStatus.DOWNVOTED }
            );
        });

        it('handles errors when updating the vote status', async () => {
            (updateDoc as jest.MockedFunction<typeof updateDoc>).mockRejectedValueOnce(new Error('Failed to update document'));

            const result = await updateReviewVote(reviewId, voteId, VoteStatus.DOWNVOTED);

            expect(result).toBe(false);
        });
    });
});
