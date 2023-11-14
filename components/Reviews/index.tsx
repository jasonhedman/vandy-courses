import React from 'react';

import {Card, Text, VStack} from "@chakra-ui/react";

import Review from "@/components/Reviews/Review";
import ReviewModal from "@/components/Reviews/ReviewModal";

import useReviewModal from "@/hooks/feed/useReviewModal";

import {Professor} from "@/types/Professor";
import {Review as ReviewType} from "@/types/Review";

interface Props {
    reviews: ReviewType[],
    setCourseId?: (courseId: string | null) => void,
    setProfessor?: (professor: Professor | null) => void,
    admin?: boolean,
    profile?: boolean
}

const Reviews: React.FC<Props> = ({ reviews, setCourseId, setProfessor, admin, profile }) => {

    const { reviewId, onClose, isOpen, openModal } = useReviewModal();

    return (
        <>
            {
                reviewId && (
                    <ReviewModal
                        isOpen={isOpen}
                        onClose={onClose}
                        reviewId={reviewId}
                        admin={admin}
                        profile={profile}
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
                                setCourseId={setCourseId}
                                setProfessor={setProfessor}
                                admin={admin}
                                profile={profile}
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
