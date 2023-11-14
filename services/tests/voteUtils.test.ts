import { describe, it, expect } from "@jest/globals";
import { VoteStatus } from "@/types/Vote";
import { getVoteIncrement, getToastMessage } from "@/services/voteUtils";

describe('Vote Utilities', () => {
  describe('getVoteIncrement', () => {
    // Add test cases for all combinations of currentStatus and newVoteStatus
    it('returns 1 for new upvote or undo downvote', () => {
      expect(getVoteIncrement(VoteStatus.NONE, VoteStatus.UPVOTED)).toBe(1);
      expect(getVoteIncrement(VoteStatus.DOWNVOTED, VoteStatus.NONE)).toBe(1);
    });

    it('returns -1 for undo upvote or new downvote', () => {
      expect(getVoteIncrement(VoteStatus.UPVOTED, VoteStatus.NONE)).toBe(-1);
      expect(getVoteIncrement(VoteStatus.NONE, VoteStatus.DOWNVOTED)).toBe(-1);
    });

    it('returns -2 for changing upvote to downvote', () => {
      expect(getVoteIncrement(VoteStatus.UPVOTED, VoteStatus.DOWNVOTED)).toBe(-2);
    });

    it('returns 2 for changing downvote to upvote', () => {
      expect(getVoteIncrement(VoteStatus.DOWNVOTED, VoteStatus.UPVOTED)).toBe(2);
    });

    it('returns 0 for no change or invalid combinations', () => {
      expect(getVoteIncrement(VoteStatus.NONE, VoteStatus.NONE)).toBe(0);
      expect(getVoteIncrement(VoteStatus.UPVOTED, VoteStatus.UPVOTED)).toBe(0);
      expect(getVoteIncrement(VoteStatus.DOWNVOTED, VoteStatus.DOWNVOTED)).toBe(0);
    });
  });

  describe('getToastMessage', () => {
    it('returns correct message for successful vote update', () => {
      const results = [true, true] as [boolean, boolean];
      // Testing for removing upvote
      let toastOptions = getToastMessage(results, VoteStatus.UPVOTED, VoteStatus.NONE);
      expect(toastOptions.title).toBe("Upvote Removed");
      expect(toastOptions.status).toBe("success");

      // Testing for adding upvote
      toastOptions = getToastMessage(results, VoteStatus.NONE, VoteStatus.UPVOTED);
      expect(toastOptions.title).toBe("Upvote Successful");
      expect(toastOptions.status).toBe("success");
    });

    it('returns correct message for failed vote update', () => {
      const results = [false, false] as [boolean, boolean];
      // Testing for failed removal of upvote
      let toastOptions = getToastMessage(results, VoteStatus.UPVOTED, VoteStatus.NONE);
      expect(toastOptions.title).toBe("Upvote Failed");
      expect(toastOptions.status).toBe("error");

      // Testing for failed addition of upvote
      toastOptions = getToastMessage(results, VoteStatus.NONE, VoteStatus.UPVOTED);
      expect(toastOptions.title).toBe("Upvote Failed");
      expect(toastOptions.status).toBe("error");
    });

    // Additional tests for downvote scenarios
    it('returns correct message for downvote scenarios', () => {
      // Assume success is true for simplicity
      const results = [true, true] as [boolean, boolean];

      // Testing for adding downvote
      let toastOptions = getToastMessage(results, VoteStatus.NONE, VoteStatus.DOWNVOTED);
      expect(toastOptions.title).toBe("Downvote Successful");
      expect(toastOptions.status).toBe("success");

      // Testing for removing downvote
      toastOptions = getToastMessage(results, VoteStatus.DOWNVOTED, VoteStatus.NONE);
      expect(toastOptions.title).toBe("Downvote Removed");
      expect(toastOptions.status).toBe("success");
    });
  });
});
