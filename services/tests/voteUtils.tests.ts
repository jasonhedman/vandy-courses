import { getVoteIncrement, getToastMessage } from "../voteUtils"; // Replace with the correct path
import {VoteInput, VoteStatus} from "@/types/Vote";
import { UseToastOptions } from "@chakra-ui/react";

describe('getVoteIncrement', () => {
  test('returns 1 for new upvote or undo downvote', () => {
    expect(getVoteIncrement(VoteStatus.NONE, VoteStatus.UPVOTED)).toBe(1);
    expect(getVoteIncrement(VoteStatus.DOWNVOTED, VoteStatus.NONE)).toBe(1);
  });

  test('returns -1 for undo upvote or new downvote', () => {
    expect(getVoteIncrement(VoteStatus.UPVOTED, VoteStatus.NONE)).toBe(-1);
    expect(getVoteIncrement(VoteStatus.NONE, VoteStatus.DOWNVOTED)).toBe(-1);
  });

  test('returns -2 for changing upvote to downvote', () => {
    expect(getVoteIncrement(VoteStatus.UPVOTED, VoteStatus.DOWNVOTED)).toBe(-2);
  });

  test('returns 2 for changing downvote to upvote', () => {
    expect(getVoteIncrement(VoteStatus.DOWNVOTED, VoteStatus.UPVOTED)).toBe(2);
  });

  test('returns 0 for no change or invalid combination', () => {
    expect(getVoteIncrement(VoteStatus.NONE, VoteStatus.NONE)).toBe(0);
    // Add more test cases for invalid combinations if necessary
  });
});
describe('getToastMessage', () => {
    test('returns correct message object when removing a vote', () => {
      // Explicitly declare `results` as a tuple [boolean, boolean]
      const results: [boolean, boolean] = [true, true];
      const currentStatus = VoteStatus.UPVOTED;
      const newVoteStatus = VoteStatus.NONE;
  
      const expectedToast: UseToastOptions = {
        title: "Upvote Removed",
        description: "Your upvote has been removed.",
        status: "success",
        duration: 3000,
        isClosable: true,
      };
  
      expect(getToastMessage(results, currentStatus, newVoteStatus)).toEqual(expectedToast);
    });
  
    test('returns correct message object when voting fails', () => {
      // Explicitly declare `results` as a tuple [boolean, boolean]
      const results: [boolean, boolean] = [false, false];
      const currentStatus = VoteStatus.NONE;
      const newVoteStatus = VoteStatus.UPVOTED;
  
      const expectedToast: UseToastOptions = {
        title: "Upvote Failed",
        description: "Your upvote could not be recorded.",
        status: "error",
        duration: 3000,
        isClosable: true,
      };
  
      expect(getToastMessage(results, currentStatus, newVoteStatus)).toEqual(expectedToast);
    });
  });
