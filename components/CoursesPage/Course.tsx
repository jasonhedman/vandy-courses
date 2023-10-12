import React from 'react';

import { Course as CourseType } from "@/types/Course";
import {Badge, Card, Heading, Text, VStack} from "@chakra-ui/react";

interface Props {
    course: CourseType
}

const Course: React.FC<Props> = ({ course }) => {
    return (
        <Card>
            <VStack
                align={'start'}
            >
                <Badge
                    size={'lg'}
                    colorScheme={'brand'}
                >
                    {course.id.replace("_", " ").toUpperCase().slice(0, 15)}{course.id.length > 15 ? "..." : ""}
                </Badge>
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
                    {course.numReviews} Reviews
                </Text>
            </VStack>
        </Card>
    );
};

export default Course;
