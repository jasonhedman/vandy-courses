import {voteReview} from "@/services/reviews";
import useAuth from "@/hooks/auth/useAuth";
import useVotes from "@/hooks/queries/useVotes";
import {useMemo} from "react";
import {VoteStatus} from "@/types/Vote";

const useVoteReview = (reviewId: string) => {

    const { user } = useAuth();

    const { votes, loading } = useVotes(user?.uid || "", reviewId);

    const voteStatus = useMemo<VoteStatus>(() => {
        return votes?.length ? (votes[0].isUpvote ? VoteStatus.UPVOTED : VoteStatus.DOWNVOTED) : VoteStatus.NONE;
    }, [votes]);

    const onUpvote = async () => {
        await voteReview(reviewId, true);
    }

    const onDownvote = async () => {
        await voteReview(reviewId, false);
    }

    return {
        onUpvote,
        onDownvote,
        voteStatus,
        loading,
    }

}

export default useVoteReview;