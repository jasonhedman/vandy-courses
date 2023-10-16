import React from 'react';

import {Badge, HStack} from "@chakra-ui/react";

import {Review} from "@/types/Review";

interface Props {
    review: Review
}

const ReviewBadges: React.FC<Props> = ({ review}) => {
    return (
        <HStack>
            <Badge
                colorScheme={'green'}
            >
                {review.courseId.replace("_", " ")}
            </Badge>
            <Badge
                colorScheme={'blue'}
            >
                {review.professor.name}
            </Badge>
        </HStack>
    );
};

export default ReviewBadges;
