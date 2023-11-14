import { jest, describe, it, expect } from "@jest/globals";

import {addDoc, doc, DocumentReference, increment, updateDoc} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import { addComment, voteComment } from "@/services/comment";
import {CommentInput} from "@/types/Comment";

jest.mock("@firebase/firestore", () => ({
    addDoc: jest.fn(),
    collection: jest.fn(),
    doc: jest.fn(),
    increment: jest.fn(),
    updateDoc: jest.fn(),
}));

jest.mock("@/firebase/firestore", () => ({}));

describe('Comment Services', () => {
    const mockCommentInput: CommentInput = {
        reviewId: 'review1',
        content: 'Great review!',
        userId: 'user1',
    };

    const mockCommentId = 'comment1';

    describe('addComment', () => {
        it('adds a comment and updates the ID successfully', async () => {
            const mockDocRef: DocumentReference = {
                id: mockCommentId,
            } as DocumentReference;

            (addDoc as jest.MockedFunction<typeof addDoc>).mockResolvedValueOnce(mockDocRef);
            (updateDoc as jest.MockedFunction<typeof updateDoc>).mockResolvedValueOnce(undefined);

            const result = await addComment(mockCommentInput);

            expect(result).toBe(true);
            expect(addDoc).toHaveBeenCalled();
            expect(updateDoc).toHaveBeenCalledWith(mockDocRef, { id: mockCommentId });
        });

        it('handles errors when adding a comment', async () => {
            (addDoc as jest.MockedFunction<typeof addDoc>).mockRejectedValueOnce(new Error('Failed to add document'));

            const result = await addComment(mockCommentInput);

            expect(result).toBe(false);
        });

        // You could add another test case for handling errors in updateDoc
    });

    describe('voteComment', () => {
        it('successfully updates the score of a comment', async () => {
            (updateDoc as jest.MockedFunction<typeof updateDoc>).mockResolvedValueOnce(undefined);

            const result = await voteComment('review1', mockCommentId, 1);

            expect(result).toBe(true);
            expect(updateDoc).toHaveBeenCalledWith(doc(firestore, 'reviews', 'review1', 'comments', mockCommentId), {
                score: increment(1),
            });
        });

        it('handles errors when updating the score', async () => {
            (updateDoc as jest.MockedFunction<typeof updateDoc>).mockRejectedValueOnce(new Error('Failed to update document'));

            const result = await voteComment('review1', mockCommentId, 1);

            expect(result).toBe(false);
        });
    });
});
