import React from 'react';

import {Flex, Heading, HStack, Text, useColorModeValue, VStack} from "@chakra-ui/react";

import RatingDisplay from "@/components/Home/Reviews/RatingDisplay";
import ReviewUpvoteDownvote from "@/components/Home/Reviews/ReviewUpvoteDownvote";
import ClickableCard from "@/components/Utilities/ClickableCard";
import ReviewBadges from "@/components/Home/Reviews/ReviewBadges";

import {MAXIMUM_RATING} from "@/data/reviewConstants";

import { Review as ReviewType } from '@/types/Review';
import {Professor} from "@/types/Professor";

interface Props {
    review: ReviewType,
    onClick: () => void,
    setCourseId?: (courseId: string | null) => void,
    setProfessor?: (professor: Professor | null) => void,
}

const Review: React.FC<Props> = ({ review, onClick, setCourseId, setProfessor }) => {

    const timeColor = useColorModeValue("blackAlpha.700", "whiteAlpha.700");

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
                    <ReviewBadges
                        review={review}
                        setCourseId={setCourseId}
                        setProfessor={setProfessor}
                    />
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
                    <Text
                        fontSize='xs'
                        color={timeColor}
                    >
                        {review.createdAt.fromNow()}
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
                    <ReviewUpvoteDownvote
                        reviewId={review.id}
                        score={review.score}
                    />
                </HStack>
            </Flex>
        </ClickableCard>
    );
};

export default Review;
