import React from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton, Text, Heading, VStack, ModalFooter, SimpleGrid, Divider, HStack
} from "@chakra-ui/react";

import {Review} from "@/types/Review";
import ReviewBadges from "@/components/Home/Reviews/ReviewBadges";
import RatingDisplay from "@/components/Home/Reviews/RatingDisplay";
import {MAXIMUM_RATING} from "@/data/reviewConstants";
import UpvoteDownvote from "@/components/Home/Reviews/UpvoteDownvote";

interface Props {
    isOpen: boolean,
    onClose: () => void,
    review: Review
}

const ReviewModal: React.FC<Props> = ({ isOpen, onClose, review }) => {

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={'2xl'}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader />
                <ModalCloseButton />
                <ModalBody>
                    <VStack
                        align={'start'}
                        spacing={4}
                        w={'100%'}
                    >
                        <HStack
                            w={'100%'}
                            justify={'space-between'}
                        >
                            <VStack
                                align={'start'}
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
                            <UpvoteDownvote
                                reviewId={review.id}
                                score={review.score}
                            />
                        </HStack>

                        <Divider />
                        <Heading
                            size={'md'}
                            fontWeight={'bold'}
                            mb={0}
                        >
                            Ratings
                        </Heading>
                        <SimpleGrid
                            columns={3}
                            w={'100%'}
                            spacing={4}
                        >
                            <RatingDisplay
                                rating={review.difficulty}
                                maxRating={MAXIMUM_RATING}
                                label={"Difficulty"}
                                color={"orange.500"}
                            />
                            <RatingDisplay
                                rating={review.rating}
                                maxRating={MAXIMUM_RATING}
                                label={"Rating"}
                                color={"green.500"}
                            />
                            <RatingDisplay
                                rating={review.skippability}
                                maxRating={MAXIMUM_RATING}
                                label={"Skippability"}
                                color={"blue.500"}
                            />
                            <RatingDisplay
                                rating={review.chatGptability}
                                maxRating={MAXIMUM_RATING}
                                label={"Chat GPTability"}
                                color={"purple.500"}
                            />
                            <RatingDisplay
                                rating={review.effortForA}
                                maxRating={MAXIMUM_RATING}
                                label={"Effort for A"}
                                color={"pink.500"}
                            />
                            <RatingDisplay
                                rating={review.sleepScore}
                                maxRating={MAXIMUM_RATING}
                                label={"Sleep Score"}
                                color={"teal.500"}
                            />

                        </SimpleGrid>
                    </VStack>
                </ModalBody>
                <ModalFooter />
            </ModalContent>
        </Modal>
    );
};

export default ReviewModal;