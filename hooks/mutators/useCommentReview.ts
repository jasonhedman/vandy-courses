import useAuth from "@/hooks/auth/useAuth";
import useCommentVotes from "@/hooks/queries/useCommentVotes";

import {voteComment} from "@/services/comment";
import {addCommentVote, updateCommentVote} from "@/services/commentVotes";

import {VoteStatus} from "@/types/Vote";

// custom hook to handle voting on comments
const useVoteComment = (reviewId: string, commentId: string) => {

    // gets the current user, preventing users from voting on comments if they are not logged in
    const { user } = useAuth();

    // gets the current votes for the comment
    const { votes, loading } = useCommentVotes(user?.uid || "", reviewId, commentId);

    // handles upvoting a comment
    // creates a new vote if the user has not voted on the comment before or updates the existing vote
    // updates the aggregate score of the comment
    const onUpvote = async () => {
        if(loading || !user) return;
        // if the user has already voted on the comment
        if(votes?.length)
        {
            const voteStatus = votes[0].voteStatus;
            // if the user has already upvoted the comment, do nothing
            if(voteStatus != VoteStatus.UPVOTED)
            {
                await Promise.all([
                    // increments the score by 2 if the user has downvoted the comment before
                    // increments the score by 1 if the user has not voted on the comment before
                    voteComment(reviewId, commentId, voteStatus == VoteStatus.DOWNVOTED ? 2 : 1),
                    // updates the vote status of the comment
                    updateCommentVote(reviewId, commentId, votes[0].id, VoteStatus.UPVOTED)
                ])
            }
        }
        // if the user has not voted on the comment before
        else {
            await Promise.all([
                // increments the vote count by 1
                await voteComment(reviewId, commentId, 1),
                // creates a new vote for the comment and sets the vote status to upvoted
                await addCommentVote(reviewId, commentId,{
                    userId: user.uid || "",
                    voteStatus: VoteStatus.UPVOTED,
                })
            ])
        }
    }

    // handles downvoting a comment
    // creates a new vote if the user has not voted on the comment before or updates the existing vote
    // updates the aggregate score of the comment
    const onDownvote = async () => {
        if(loading || !user) return;
        // if the user has already voted on the comment
        if(votes?.length)
        {
            const voteStatus = votes[0].voteStatus;
            // if the user has already downvoted the comment, do nothing
            if(voteStatus != VoteStatus.DOWNVOTED)
            {
                await Promise.all([
                    // decrements the score by 2 if the user has upvoted the comment before
                    // decrements the score by 1 if the user has not voted on the comment before
                    voteComment(reviewId, commentId,voteStatus == VoteStatus.UPVOTED ? -2 : -1),
                    // updates the vote status of the comment and sets it to downvoted
                    updateCommentVote(reviewId, commentId, votes[0].id, VoteStatus.DOWNVOTED)
                ])
            }
        }
        // if the user has not voted on the comment before
        else {
            await Promise.all([
                // decrements the vote count by 1
                await voteComment(reviewId, commentId,-1),
                // creates a new vote for the comment
                await addCommentVote(reviewId, commentId,{
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

export default useVoteComment;