import React from 'react';

import AutoCompleteMenu from "@/components/Utilities/AutoCompleteMenu";

import useCourses from "@/hooks/queries/useCourses";

import {Course} from "@/types/Course";

interface Props {
    setCourse: (course: Course | null) => void,
    onBlur?: () => void,
    error?: string,
}

const CourseMenu: React.FC<Props> = ({ setCourse, onBlur, error }) => {

    const { courses } = useCourses();

    return (
        <AutoCompleteMenu
            label={"Course"}
            placeholder={"Find a Course"}
            optionLabels={(courses || []).map(course => course.id.replace("_", " ").toUpperCase())}
            options={courses || []}
            onSelect={setCourse}
            onBlur={onBlur}
            helperText={error}
            helperTextColor={'red.500'}
        />
    );
};

export default CourseMenu;
