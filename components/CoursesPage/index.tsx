import React from 'react';

import {SimpleGrid, Skeleton} from "@chakra-ui/react";

import Course from "@/components/CoursesPage/Course";

import useCourses from "@/hooks/queries/useCourses";

const Courses = () => {

    const { courses, loading } = useCourses();

    if (loading) {
        return (
            <Skeleton height="100px" />
        )
    }

    return (
        <SimpleGrid
            columns={3}
            spacing={4}
        >
            {
                courses.map(course => (
                    <Course
                        key={course.id}
                        course={course}
                    />
                ))
            }
        </SimpleGrid>
    );
};

export default Courses;
