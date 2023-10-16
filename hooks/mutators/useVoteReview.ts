import useAuth from "@/hooks/auth/useAuth";
import useVotes from "@/hooks/queries/useVotes";

import {voteReview} from "@/services/reviews";
import {addVote, updateVote} from "@/services/votes";

import {VoteStatus} from "@/types/Vote";

const useVoteReview = (reviewId: string) => {

    const { user } = useAuth();

    const { votes, loading } = useVotes(user?.uid || "", reviewId);

    const onUpvote = async () => {
        if(loading || !user) return;
        if(votes?.length)
        {
            const voteStatus = votes[0].voteStatus;
            if(voteStatus != VoteStatus.UPVOTED)
            {
                await Promise.all([
                    voteReview(reviewId, voteStatus == VoteStatus.DOWNVOTED ? 2 : 1),
                    updateVote(votes[0].id, VoteStatus.UPVOTED)
                ])
            }
        } else {
            await Promise.all([
                await voteReview(reviewId, 1),
                await addVote({
                    userId: user.uid || "",
                    reviewId,
                    voteStatus: VoteStatus.UPVOTED,
                })
            ])
        }
    }

    const onDownvote = async () => {
        if(loading || !user) return;
        if(votes?.length)
        {
            const voteStatus = votes[0].voteStatus;
            if(voteStatus != VoteStatus.DOWNVOTED)
            {
                await Promise.all([
                    voteReview(reviewId, voteStatus == VoteStatus.UPVOTED ? -2 : -1),
                    updateVote(votes[0].id, VoteStatus.DOWNVOTED)
                ])
            }
        } else {
            await Promise.all([
                await voteReview(reviewId, -1),
                await addVote({
                    userId: user.uid || "",
                    reviewId,
                    voteStatus: VoteStatus.DOWNVOTED,
                })
            ])
        }
    }

    return {
        onUpvote,
        onDownvote,
        voteStatus: votes?.length ? votes[0].voteStatus : VoteStatus.NONE,
        loading,
    }

}

export default useVoteReview;