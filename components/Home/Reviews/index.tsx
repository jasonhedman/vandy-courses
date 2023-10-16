import React from 'react';

import {Text, VStack} from "@chakra-ui/react";

import Review from "@/components/Home/Reviews/Review";

import {Review as ReviewType} from "@/types/Review";
import useReviewModal from "@/hooks/feed/useReviewModal";
import ReviewModal from "@/components/Home/ReviewModal";

interface Props {
    reviews: ReviewType[]
}

const Reviews: React.FC<Props> = ({ reviews }) => {

    const { review, onClose, isOpen, openModal } = useReviewModal();

    return (
        <>
            {
                review && (
                    <ReviewModal
                        isOpen={isOpen}
                        onClose={onClose}
                        review={review}
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
                        reviews.map((review, index) => (
                            <Review
                                key={index}
                                review={review}
                                onClick={() => openModal(review)}
                            />
                        ))
                    ) : (
                        <Text>
                            No Reviews!
                        </Text>
                    )
                }
            </VStack>
        </>
    );
};

export default Reviews;
