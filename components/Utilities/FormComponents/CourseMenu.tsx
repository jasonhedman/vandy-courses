import React from 'react';

import AutoCompleteMenu from "@/components/Utilities/AutoCompleteMenu";

import useCourses from "@/hooks/queries/useCourses";

import {Course} from "@/types/Course";

interface Props {
    course: Course | null,
    setCourse: (course: Course | null) => void,
    onBlur?: () => void,
    error?: string,
    closeButton?: boolean
}

const CourseMenu: React.FC<Props> = ({ course, setCourse, onBlur, error, closeButton }) => {

    const { courses } = useCourses();

    return (
        <AutoCompleteMenu
            label={"Course"}
            value={course}
            placeholder={"Find a Course"}
            optionLabels={(courses || []).map(course => course.id.replace("_", " ").toUpperCase())}
            options={courses || []}
            onSelect={setCourse}
            onBlur={onBlur}
            error={error}
            closeButton={closeButton}
        />
    );
};

export default CourseMenu;
