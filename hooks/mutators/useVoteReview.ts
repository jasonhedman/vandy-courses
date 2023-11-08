import useAuth from "@/hooks/auth/useAuth";
import useReviewVotes from "@/hooks/queries/useReviewVotes";

import {voteReview} from "@/services/reviews";
import {addReviewVote, updateReviewVote} from "@/services/reviewVotes";

import {VoteStatus} from "@/types/Vote";

// custom hook to handle voting on reviews
const useVoteReview = (reviewId: string) => {

    const { user } = useAuth();

    // gets the user's current vote for the review
    const { votes, loading } = useReviewVotes(user?.uid || "", reviewId);

    const onUpvote = async () => {
        if(loading || !user) return;
        // if the user has already voted on the review
        if(votes?.length)
        {
            const voteStatus = votes[0].voteStatus;
            // if the user has already upvoted the review, do nothing
            if(voteStatus != VoteStatus.UPVOTED)
            {
                await Promise.all([
                    // increments the score by 2 if the user has downvoted the review before
                    // increments the score by 1 if the user has not voted on the review before
                    voteReview(reviewId, voteStatus == VoteStatus.DOWNVOTED ? 2 : 1),
                    // updates the vote status of the review
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
                // increments the score by 1
                await voteReview(reviewId, 1),
                // creates a new vote for the review and sets the vote status to upvoted
                await addReviewVote(reviewId, {
                    userId: user.uid || "",
                    voteStatus: VoteStatus.UPVOTED,
                })
            ])
        }
    }

    // handles downvoting a review
    const onDownvote = async () => {
        if(loading || !user) return;
        // if the user has already voted on the review
        if(votes?.length)
        {
            const voteStatus = votes[0].voteStatus;
            // if the user has already downvoted the review, do nothing
            if(voteStatus != VoteStatus.DOWNVOTED)
            {
                await Promise.all([
                    // decrements the score by 2 if the user has upvoted the review before
                    // decrements the score by 1 if the user has not voted on the review before
                    voteReview(reviewId, voteStatus == VoteStatus.UPVOTED ? -2 : -1),
                    // updates the vote status of the review
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
                // decrements the score by 1
                await voteReview(reviewId, -1),
                // creates a new vote for the review and sets the vote status to downvoted
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