import React from 'react';
import {IconProps, Text, VStack} from "@chakra-ui/react";
import {ChevronDownIcon, ChevronUpIcon} from "@chakra-ui/icons";
import useVoteReview from "@/hooks/mutators/useVoteReview";
import {VoteStatus} from "@/types/Vote";

interface Props {
    reviewId: string,
    score: number
}

const iconStyles: IconProps = {
    boxSize: '2rem',
    _hover: {
        cursor: 'pointer',
        opacity: 0.5
    },
    transition: 'all 0.2s ease-in-out'
}

const UpvoteDownvote: React.FC<Props> = ({ reviewId, score }) => {

    const { onUpvote, onDownvote, voteStatus } = useVoteReview(reviewId);

    return (
        <VStack
            spacing={0}
        >
            <ChevronUpIcon
                {...iconStyles}
                color={voteStatus === VoteStatus.UPVOTED ? 'green.500' : undefined}
                onClick={onUpvote}
            />
            <Text
                fontWeight={'bold'}
            >
                {score}
            </Text>
            <ChevronDownIcon
                {...iconStyles}
                color={voteStatus === VoteStatus.DOWNVOTED ? 'red.500' : undefined}
                onClick={onDownvote}
            />
        </VStack>
    );
};

export default UpvoteDownvote;
