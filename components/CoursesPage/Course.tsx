import React from 'react';

import {Heading, Text, VStack} from "@chakra-ui/react";

import CourseBadges from "@/components/CoursesPage/CourseBadges";
import ClickableCard from "@/components/Utilities/ClickableCard";

import { Course as CourseType } from "@/types/Course";

interface Props {
    course: CourseType
    onClick: () => void
}

const Course: React.FC<Props> = ({ course, onClick }) => {
    return (
        <ClickableCard
            onClick={onClick}
        >
            <VStack
                align={'start'}
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
                >
                    {course.numReviews} Review{course.numReviews === 1 ? "" : "s"}
                </Text>
            </VStack>
        </ClickableCard>
    );
};

export default Course;
