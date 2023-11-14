import React from 'react';

import UpvoteDownvote from "@/components/Utilities/UpvoteDownvote";

import useVoteReview from "@/hooks/mutators/useVoteReview";

interface Props {
    reviewId: string,
    score: number
}

const ReviewUpvoteDownvote: React.FC<Props> = ({ reviewId, score }) => {

    const { onUpvote, onDownvote, voteStatus } = useVoteReview(reviewId);

    return (
        <UpvoteDownvote
            onUpvote={onUpvote}
            onDownvote={onDownvote}
            voteStatus={voteStatus}
            score={score}
        />
    );
};

export default ReviewUpvoteDownvote;
