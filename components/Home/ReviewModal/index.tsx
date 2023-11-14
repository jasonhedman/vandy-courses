import React from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Heading,
    VStack,
    ModalFooter,
    SimpleGrid,
    Divider,
    HStack,
    Skeleton,
    Text
} from "@chakra-ui/react";

import ReportButton from '@/components/Home/Reports/ReportButton';
import ReviewBadges from "@/components/Home/Reviews/ReviewBadges";
import RatingDisplay from "@/components/Home/Reviews/RatingDisplay";
import ReviewUpvoteDownvote from "@/components/Home/Reviews/ReviewUpvoteDownvote";
import Comments from "@/components/Home/Comments";
import WriteComment from "@/components/Home/Comments/WriteComment";
import Reports from "@/components/Home/Reports/Reports";

import useReview from "@/hooks/queries/useReview";

import {MAXIMUM_RATING} from "@/data/reviewConstants";
import DeleteReview from "@/components/Home/Reviews/DeleteReview";

interface Props {
    isOpen: boolean,
    onClose: () => void,
    reviewId: string,
    admin?: boolean,
}

const ReviewModal: React.FC<Props> = ({ isOpen, onClose, reviewId, admin }) => {

    const { review, loading } = useReview(reviewId);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={'2xl'}
            scrollBehavior={'inside'}
        >
            <ModalOverlay />
            <ModalContent>
                {
                    loading || !review ? (
                        <Skeleton />
                    ) : (
                        <>
                            <ModalHeader>
                                <HStack display='flex' justifyContent='flex-end'>
                                    <ReportButton reviewId={review.id} />
                                    <ModalCloseButton />
                                </HStack>
                            </ModalHeader>
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
                                        {
                                            admin ? (
                                                <DeleteReview
                                                    reviewId={review.id}
                                                    afterDelete={onClose}
                                                />
                                            ) : (
                                                <ReviewUpvoteDownvote
                                                    reviewId={review.id}
                                                    score={review.score}
                                                />
                                            )
                                        }
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
                                    <Divider />
                                    {
                                        admin ? (
                                            <>
                                                <Heading
                                                    size={'md'}
                                                    fontWeight={'bold'}
                                                    mb={0}
                                                >
                                                    Reports
                                                </Heading>
                                                <Reports
                                                    reviewId={review.id}
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <Heading
                                                    size={'md'}
                                                    fontWeight={'bold'}
                                                    mb={0}
                                                >
                                                    Comments
                                                </Heading>
                                                <WriteComment reviewId={review.id} />
                                                <Comments
                                                    reviewId={review.id}
                                                />
                                            </>
                                        )
                                    }
                                </VStack>
                            </ModalBody>
                            <ModalFooter />
                        </>
                    )
                }
            </ModalContent>
        </Modal>
    );
};

export default ReviewModal;