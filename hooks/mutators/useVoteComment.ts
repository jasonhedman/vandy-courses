import {useToast} from "@chakra-ui/react";

import useAuth from "@/hooks/auth/useAuth";
import useCommentVotes from "@/hooks/queries/useCommentVotes";

import {voteComment} from "@/services/comment";
import {addCommentVote, updateCommentVote} from "@/services/commentVotes";
import {getVoteIncrement, getToastMessage} from "@/services/voteUtils";

import {VoteStatus} from "@/types/Vote";

// custom hook to handle voting on comments
const useVoteComment = (reviewId: string, commentId: string) => {

    // gets the current user, preventing users from voting on comments if they are not logged in
    const { user } = useAuth();

    // gets the current votes for the comment
    const { votes, loading } = useCommentVotes(user?.uid || "", reviewId, commentId);

    const toast = useToast();

    const handleVote = async (voteType: VoteStatus) => {
        if (loading || !user) return;

        const alreadyVoted = votes?.length;
        const currentVoteStatus = alreadyVoted ? votes[0].voteStatus : VoteStatus.NONE;
        const newStatus = currentVoteStatus === voteType ? VoteStatus.NONE : voteType;
        const amountIncrement = getVoteIncrement(currentVoteStatus, newStatus);

        const results = await Promise.all([
            voteComment(reviewId, commentId, amountIncrement),
            alreadyVoted
                ? updateCommentVote(reviewId, commentId, votes[0].id, newStatus)
                : addCommentVote(reviewId, commentId, {
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
    }

}

export default useVoteComment;