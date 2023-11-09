import React from 'react';

import {Button, HStack} from "@chakra-ui/react";

import {Review} from "@/types/Review";

import useReviews from "@/hooks/queries/useReviews";
import professorsCollection from '@/firebase/firestore/converters/professorConverter';

interface Props {
    review: Review
}

const ReviewBadges: React.FC<Props> = ({ review}) => {

    return (
        <HStack>
            <Button
                colorScheme={'green'}
                size = 'xs'
                variant = 'outline'
                // onClick={}
            >
                {review.courseId.replace("_", " ").toUpperCase()}
            </Button>
            <Button
                colorScheme={'blue'}
                size = 'xs'
                variant = 'outline'
            >
                {review.professor.name}
            </Button>
        </HStack>
    );
};

export default ReviewBadges;
