import React from 'react';

import {Flex, Heading, HStack, Text, VStack} from "@chakra-ui/react";

import RatingDisplay from "@/components/Home/Reviews/RatingDisplay";
import UpvoteDownvote from "@/components/Home/Reviews/UpvoteDownvote";
import ClickableCard from "@/components/Utilities/ClickableCard";
import ReviewBadges from "@/components/Home/Reviews/ReviewBadges";

import {MAXIMUM_RATING} from "@/data/reviewConstants";

import { Review as ReviewType } from '@/types/Review';

interface Props {
    review: ReviewType,
    onClick: () => void
}

const Review: React.FC<Props> = ({ review, onClick }) => {
    return (
        <ClickableCard
            onClick={onClick}
        >
            <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <VStack
                    align={'start'}
                    spacing={2}
                    flex={1}
                >
                    <ReviewBadges review={review} />
                    <Heading
                        size={'md'}
                        fontWeight={'bold'}
                        mb={0}
                    >
                        {review.title}
                    </Heading>
                    <Text>
                        {review.content}
                    </Text>
                </VStack>
                <HStack
                    spacing={4}
                >
                    <RatingDisplay
                        rating={review.difficulty}
                        maxRating={MAXIMUM_RATING}
                        label={"Difficulty"}
                        color={"orange.500"}
                        size={"75px"}
                    />
                    <RatingDisplay
                        rating={review.rating}
                        maxRating={MAXIMUM_RATING}
                        label={"Rating"}
                        color={"green.500"}
                        size={"75px"}
                    />
                    <UpvoteDownvote
                        reviewId={review.id}
                        score={review.score}
                    />
                </HStack>
            </Flex>
        </ClickableCard>
    );
};

export default Review;
