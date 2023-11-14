import React from 'react';

import {Badge, Button, HStack} from "@chakra-ui/react";

import {Review} from "@/types/Review";
import {Professor} from "@/types/Professor";

interface Props {
    review: Review,
    setCourseId?: (courseId: string | null) => void,
    setProfessor?: (professor: Professor | null) => void,
}

const ReviewBadges: React.FC<Props> = ({ review, setCourseId, setProfessor}) => {

    return (
        <HStack>
            {
                setCourseId ? (
                    <Button
                        colorScheme={'green'}
                        size='xs'
                        variant='outline'
                        onClick={(e) => {
                            e.stopPropagation();
                            setCourseId(review.courseId)
                        }}
                    >
                        {review.courseId.replace("_", " ").toUpperCase()}
                    </Button>
                ) : (
                    <Badge
                        colorScheme={'green'}
                        size = 'xs'
                    >
                        {review.courseId.replace("_", " ").toUpperCase()}
                    </Badge>
                )
            }
            {
                setProfessor ? (
                    <Button
                        colorScheme={'blue'}
                        size='xs'
                        variant='outline'
                        onClick={(e) => {
                            e.stopPropagation();
                            setProfessor(review.professor)
                        }}
                    >
                        {review.professor.name}
                    </Button>
                ) : (
                    <Badge
                        colorScheme={'blue'}
                        size = 'xs'
                    >
                        {review.professor.name}
                    </Badge>
                )
            }
        </HStack>
    );
};

export default ReviewBadges;
