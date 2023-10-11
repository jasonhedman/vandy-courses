import React from 'react';

import { Review as ReviewType } from '@/types/Review';
import {Badge, Card, Flex, Heading, HStack, Text, VStack} from "@chakra-ui/react";
import RatingDisplay from "@/components/Home/Reviews/RatingDisplay";
import UpvoteDownvote from "@/components/Home/Reviews/UpvoteDownvote";

interface Props {
    review: ReviewType
}

const Review: React.FC<Props> = ({ review }) => {
    return (
        <Card>
            <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <VStack
                    align={'start'}
                    spacing={2}
                    flex={1}
                >
                    <HStack>
                        <Badge
                            colorScheme={'green'}
                        >
                            {review.courseId}
                        </Badge>
                        <Badge
                            colorScheme={'blue'}
                        >
                            {review.professorId}
                        </Badge>
                    </HStack>
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
                        // TODO: replace this with the constant post merge
                        maxRating={5}
                        label={"Difficulty"}
                        color={"orange.500"}
                        size={"75px"}
                    />
                    <RatingDisplay
                        rating={review.rating}
                        // TODO: replace this with the constant post merge
                        maxRating={5}
                        label={"Rating"}
                        color={"green.500"}
                        size={"75px"}
                    />
                    <UpvoteDownvote
                        score={review.score}
                    />
                </HStack>
            </Flex>
        </Card>
    );
};

export default Review;
