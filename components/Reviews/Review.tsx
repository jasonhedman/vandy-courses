import React from 'react';

import {Box, Flex, Heading, HStack, Text, useColorModeValue, VStack} from "@chakra-ui/react";

import RatingDisplay from "@/components/Reviews/RatingDisplay";
import ReviewUpvoteDownvote from "@/components/Reviews/ReviewUpvoteDownvote";
import ClickableCard from "@/components/Utilities/ClickableCard";
import ReviewBadges from "@/components/Reviews/ReviewBadges";

import {MAXIMUM_RATING} from "@/data/reviewConstants";

import { Review as ReviewType } from '@/types/Review';
import {Professor} from "@/types/Professor";
import DeleteReview from "@/components/Reviews/DeleteReview";

interface Props {
    review: ReviewType,
    onClick: () => void,
    setCourseId?: (courseId: string | null) => void,
    setProfessor?: (professor: Professor | null) => void,
    admin?: boolean,
    profile?: boolean,
}

const Review: React.FC<Props> = ({ review, onClick, setCourseId, setProfessor, admin, profile }) => {

    const timeColor = useColorModeValue("blackAlpha.700", "whiteAlpha.700");

    return (
        <ClickableCard
            onClick={onClick}
        >
            <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
                gap={{
                    base: 2,
                    md: 4,
                }}
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
                    {
                        admin && (
                            <Text
                                fontSize='xs'
                                color={timeColor}
                            >
                                {review.numReports} Report{review.numReports === 1 ? "" : "s"}
                            </Text>
                        )
                    }
                </VStack>
                <HStack
                    spacing={4}
                >
                    <Box
                        display={{
                            base: "none",
                            md: "block",
                        }}
                    >
                        <RatingDisplay
                            rating={review.difficulty}
                            maxRating={MAXIMUM_RATING}
                            label={"Difficulty"}
                            color={"orange.500"}
                            size={"75px"}
                        />
                    </Box>
                    <RatingDisplay
                        rating={review.rating}
                        maxRating={MAXIMUM_RATING}
                        label={"Rating"}
                        color={"green.500"}
                        size={"75px"}
                    />
                    {
                        admin || profile ? (
                            <DeleteReview
                                reviewId={review.id}
                            />
                        ) : (
                            <ReviewUpvoteDownvote
                                reviewId={review.id}
                                score={review.score}
                            />
                        )
                    }
                </HStack>
            </Flex>
        </ClickableCard>
    );
};

export default Review;
