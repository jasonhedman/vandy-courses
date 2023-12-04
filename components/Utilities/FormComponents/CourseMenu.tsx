import React, { useState, useEffect } from 'react';

import AutoCompleteMenu from "@/components/Utilities/AutoCompleteMenu";

import useCourses from "@/hooks/queries/useCourses";

import {Course} from "@/types/Course";

interface Props {
    courseId: string | null,
    setCourseId: (courseId: string | null) => void,
    description?: string,
    onBlur?: () => void,
    error?: string,
    closeButton?: boolean
}

const CourseMenu: React.FC<Props> = ({ courseId, setCourseId, description, onBlur, error, closeButton }) => {

    const { refine, hits } = useCourses();

    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        if (courseId) {
            setInputValue(courseId.replace("_", " ").toUpperCase());
        } else {
            setInputValue("");
        }
    }, [courseId]);

    const handleInputChange = (val: string) => {
        setInputValue(val);
        refine(val);
    }

    return (
        <AutoCompleteMenu
            label={"Course"}
            value={courseId}
            description={description}
            inputValue={inputValue}
            setInputValue={handleInputChange}
            placeholder={"Find a Course"}
            options={(hits).map(course => course.objectID)}
            optionLabels={(hits).map(course => course.objectID.replace("_", " ").toUpperCase())}
            onSelect={setCourseId}
            onBlur={onBlur}
            error={error}
            closeButton={closeButton}
        />
    );
};

export default CourseMenu;
