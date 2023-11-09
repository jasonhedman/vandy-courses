import { useToast } from "@chakra-ui/react";

import useAuth from "@/hooks/auth/useAuth";
import useReviewVotes from "@/hooks/queries/useReviewVotes";

import { voteReview } from "@/services/reviews";
import { addReviewVote, updateReviewVote } from "@/services/reviewVotes";
import { getVoteIncrement, getToastMessage } from "@/services/voteUtils";

import { VoteStatus } from "@/types/Vote";

// custom hook to handle voting on reviews
const useVoteReview = (reviewId: string) => {
    const { user } = useAuth();
    const { votes, loading } = useReviewVotes(user?.uid || "", reviewId);
    const toast = useToast();

    const handleVote = async (voteType: VoteStatus) => {
        if (loading || !user) return;

        const alreadyVoted = votes?.length;
        const currentVoteStatus = alreadyVoted ? votes[0].voteStatus : VoteStatus.NONE;
        const newStatus = currentVoteStatus === voteType ? VoteStatus.NONE : voteType;
        const amountIncrement = getVoteIncrement(currentVoteStatus, newStatus);

        const results = await Promise.all([
            voteReview(reviewId, amountIncrement),
            alreadyVoted
                ? updateReviewVote(reviewId, votes[0].id, newStatus)
                : addReviewVote(reviewId, {
                    userId: user.uid || "",
                    voteStatus: newStatus,
                })
        ]);

        toast(getToastMessage(results, currentVoteStatus, newStatus));
    };

    const onUpvote = async () => {
        await handleVote(VoteStatus.UPVOTED);
    };

    const onDownvote = async () => {
        await handleVote(VoteStatus.DOWNVOTED);
    };

    return {
        onUpvote,
        onDownvote,
        voteStatus: votes?.length ? votes[0].voteStatus : VoteStatus.NONE,
        loading,
    };
};

export default useVoteReview;