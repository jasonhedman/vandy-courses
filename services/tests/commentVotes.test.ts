import { addCommentVote, updateCommentVote } from '/Users/jamesrogers/.git/vandy-courses/services/commentVotes.ts';
import { addDoc, collection, doc, updateDoc } from '@firebase/firestore';

jest.mock('@firebase/firestore');

describe('Firestore operations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('addCommentVote successfully adds a vote', async () => {
    const reviewId = 'review123';
    const commentId = 'comment123';
    const vote = { userId: 'user123', voteStatus: 'upvote' };

    const result = await addCommentVote(reviewId, commentId, vote);

    expect(result).toBe(true);
    expect(addDoc).toHaveBeenCalledWith(
      expect.anything(), 
      vote
    );
    expect(updateDoc).toHaveBeenCalledWith(
      expect.anything(), 
      { id: 'mockDocId' }
    );
  });

  test('updateCommentVote successfully updates a vote status', async () => {
    const reviewId = 'review123';
    const commentId = 'comment123';
    const voteId = 'vote123';
    const voteStatus = 'downvote';

    const result = await updateCommentVote(reviewId, commentId, voteId, voteStatus);

    expect(result).toBe(true);
    expect(updateDoc).toHaveBeenCalledWith(
      expect.anything(), 
      { voteStatus }
    );
  });
});