import React from 'react';

import {Heading, Skeleton, Text, VStack} from "@chakra-ui/react";

import CourseBadges from "@/components/Courses/CourseBadges";
import ClickableCard from "@/components/Utilities/ClickableCard";

import useCourse from "@/hooks/queries/useCourse";

interface Props {
    courseId: string
    onClick: () => void
}

const Course: React.FC<Props> = ({ courseId, onClick }) => {

    const { course, loading } = useCourse(courseId);

    return (
        <ClickableCard
            onClick={onClick}
            w={'100%'}
        >
            {
                loading || !course ? (
                    <Skeleton
                        w={'100%'}
                    />
                ) : (
                    <VStack
                        align={'start'}
                        h={'100%'}
                    >
                        <CourseBadges
                            course={course}
                        />
                        <Heading
                            size="sm"
                        >
                            {course.name}
                        </Heading>
                        <Text>
                            {course.description.slice(0, 100)}{course.description.length > 100 ? "..." : ""}
                        </Text>
                        <Text
                            fontSize={'sm'}
                            fontWeight={'semibold'}
                            mt={'auto'}
                        >
                            {course.numReviews} Review{course.numReviews === 1 ? "" : "s"}
                        </Text>
                    </VStack>
                )
            }
        </ClickableCard>
    );
};

export default Course;
