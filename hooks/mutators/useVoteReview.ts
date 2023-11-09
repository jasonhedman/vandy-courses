import useAuth from "@/hooks/auth/useAuth";
import useVote from "@/hooks/mutators/useVote";
import useReviewVotes from "@/hooks/queries/useReviewVotes";

import {voteReview} from "@/services/reviews";
import {updateReviewVote, addReviewVote} from "@/services/reviewVotes";

import {VoteInput, VoteStatus} from "@/types/Vote";

// custom hook to handle voting on reviews
const useVoteReview = (reviewId: string) => {

    const { user } = useAuth();

    // gets the current votes for the comment
    const { votes, loading } = useReviewVotes(user?.uid || "", reviewId);

    return useVote(
        user?.uid || "",
        votes,
        loading,
        (amountIncrement: number) => voteReview(reviewId, amountIncrement),
        (voteId: string, voteStatus: VoteStatus) => updateReviewVote(reviewId, voteId, voteStatus),
        (vote: VoteInput) => addReviewVote(reviewId, vote),
    )
};

export default useVoteReview;