import React from 'react';

import {SimpleGrid, Skeleton, VStack} from "@chakra-ui/react";

import Course from "@/components/Courses/Course";

import useCourses from "@/hooks/queries/useCourses";
import CourseModal from "@/components/Courses/CourseModal";
import useCourseModal from "@/hooks/feed/useCourseModal";

const Courses = () => {

    const { courses, loading } = useCourses();

    const { isOpen, onClose, course, openCourseModal } = useCourseModal();

    if (loading) {
        return (
            <Skeleton />
        )
    }

    return (
        <>
            {
                course && (
                    <CourseModal
                        isOpen={isOpen}
                        onClose={onClose}
                        course={course}
                    />
                )
            }
            <VStack
                spacing={4}
            >
                {/*<CourseFilters*/}
                {/*    department={""}*/}
                {/*    setDepartment={() => {}}*/}
                {/*/>*/}
                <SimpleGrid
                    columns={{
                        base: 1,
                        md: 3
                    }}
                    spacing={4}
                >
                    {
                        courses.map(course => (
                            <Course
                                key={course.id}
                                course={course}
                                onClick={() => openCourseModal(course)}
                            />
                        ))
                    }
                </SimpleGrid>
            </VStack>
        </>
    );
};

export default Courses;
