import {voteReview} from "@/services/reviews";

const useVoteReview = (reviewId: string) => {

    const onUpvote = async () => {
        await voteReview(reviewId, true);
    }

    const onDownvote = async () => {
        await voteReview(reviewId, false);
    }

    return {
        onUpvote,
        onDownvote,
    }

}

export default useVoteReview;