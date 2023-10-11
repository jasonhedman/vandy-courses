import React from 'react';

import {VStack} from "@chakra-ui/react";

import Review from "@/components/Home/Reviews/Review";

import {Review as ReviewType} from "@/types/Review";

interface Props {
    reviews: ReviewType[]
}

const Reviews: React.FC<Props> = ({ reviews }) => {
    return (
        <VStack
            w={'100%'}
            gap={4}
        >
            {
                reviews.map((review, index) => (
                    <Review
                        key={index}
                        review={review}
                    />
                ))
            }
        </VStack>
    );
};

export default Reviews;
