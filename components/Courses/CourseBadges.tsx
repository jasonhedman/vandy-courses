import React from 'react';

import {Badge, HStack} from "@chakra-ui/react";

import {Course} from "@/types/Course";

interface Props {
    course: Course
}

const CourseBadges: React.FC<Props> = ({ course }) => {
    return (
        <HStack>
            <Badge
                size={'lg'}
                colorScheme={'brand'}
            >
                {course.id.replace("_", " ").toUpperCase().slice(0, 15)}{course.id.length > 15 ? "..." : ""}
            </Badge>
        </HStack>
    );
};

export default CourseBadges;
