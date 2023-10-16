import React from 'react';

import {Card, Text, VStack} from "@chakra-ui/react";

import Review from "@/components/Home/Reviews/Review";

import {Review as ReviewType} from "@/types/Review";
import useReviewModal from "@/hooks/feed/useReviewModal";
import ReviewModal from "@/components/Home/ReviewModal";

interface Props {
    reviews: ReviewType[]
}

const Reviews: React.FC<Props> = ({ reviews }) => {

    const { reviewId, onClose, isOpen, openModal } = useReviewModal();

    return (
        <>
            {
                reviewId && (
                    <ReviewModal
                        isOpen={isOpen}
                        onClose={onClose}
                        reviewId={reviewId}
                    />
                )
            }
            <VStack
                w={'100%'}
                gap={4}
                align={'start'}
            >
                {
                    reviews.length > 0 ? (
                        reviews.map((review) => (
                            <Review
                                key={review.id}
                                review={review}
                                onClick={() => openModal(review.id)}
                            />
                        ))
                    ) : (
                        <Card>
                            <Text>
                                No Reviews!
                            </Text>
                        </Card>
                    )
                }
            </VStack>
        </>
    );
};

export default Reviews;
