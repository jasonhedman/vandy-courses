import React, { useState, useEffect } from 'react';

import { HStack, Text } from "@chakra-ui/react";

import AutoCompleteMenu from "@/components/Utilities/AutoCompleteMenu";

import useCourses from "@/hooks/queries/useCourses";

import {Course} from "@/types/Course";

interface Props {
    courseId: string | null,
    setCourseId: (courseId: string | null) => void,
    onBlur?: () => void,
    error?: string,
    closeButton?: boolean
}

const CourseMenu: React.FC<Props> = ({ courseId, setCourseId, onBlur, error, closeButton }) => {

    const { courses } = useCourses();

    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        if (courseId) {
            setInputValue(courseId.replace("_", " ").toUpperCase());
        } else {
            setInputValue("");
        }
    }, [courseId]);

    return (
        <AutoCompleteMenu
            label={"Course"}
            value={courseId}
            inputValue={inputValue}
            setInputValue={setInputValue}
            placeholder={"Find a Course"}
            optionComponents={(courses || []).map(course => (
                <HStack
                    key={course.id}
                    justifyContent={"space-between"}
                    w={"100%"}
                >
                    <Text>
                        {course.id.replace("_", " ").toUpperCase()}
                    </Text>
                    <Text
                        flexShrink={0}
                    >
                        {course.numReviews} Reviews
                    </Text>
                </HStack>
            ))}
            options={(courses || []).map(course => course.id)}
            optionLabels={(courses || []).map(course => course.id.replace("_", " ").toUpperCase())}
            onSelect={setCourseId}
            onBlur={onBlur}
            error={error}
            closeButton={closeButton}
        />
    );
};

export default CourseMenu;
