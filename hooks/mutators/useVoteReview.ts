import useAuth from "@/hooks/auth/useAuth";
import useReviewVotes from "@/hooks/queries/useReviewVotes";

import {voteReview} from "@/services/reviews";
import {addReviewVote, updateReviewVote} from "@/services/reviewVotes";

import {VoteStatus} from "@/types/Vote";

const useVoteReview = (reviewId: string) => {

    const { user } = useAuth();

    const { votes, loading } = useReviewVotes(user?.uid || "", reviewId);

    const onUpvote = async () => {
        if(loading || !user) return;
        if(votes?.length)
        {
            const voteStatus = votes[0].voteStatus;
            if(voteStatus != VoteStatus.UPVOTED)
            {
                await Promise.all([
                    voteReview(reviewId, voteStatus == VoteStatus.DOWNVOTED ? 2 : 1),
                    updateReviewVote(reviewId, votes[0].id, VoteStatus.UPVOTED)
                ])
            }
            else {
                await Promise.all([
                    voteReview(reviewId, -1),
                    updateReviewVote(reviewId, votes[0].id, VoteStatus.NONE)
                ])
            }
        } else {
            await Promise.all([
                await voteReview(reviewId, 1),
                await addReviewVote(reviewId, {
                    userId: user.uid || "",
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
                    updateReviewVote(reviewId, votes[0].id, VoteStatus.DOWNVOTED)
                ])
            }
            else {
                await Promise.all([
                    voteReview(reviewId, 1),
                    updateReviewVote(reviewId, votes[0].id, VoteStatus.NONE)
                ])
            }
        } else {
            await Promise.all([
                await voteReview(reviewId, -1),
                await addReviewVote(reviewId, {
                    userId: user.uid || "",
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