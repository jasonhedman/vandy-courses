import React from 'react';

import {SimpleGrid, Skeleton, VStack} from "@chakra-ui/react";

import Course from "@/components/CoursesPage/Course";

import useCourses from "@/hooks/queries/useCourses";
import CourseModal from "@/components/CoursesPage/CourseModal";
import useCourseModal from "@/hooks/feed/useCourseModal";
import CourseFilters from "@/components/CoursesPage/CourseFilters";

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
                    columns={3}
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
