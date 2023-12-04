import React from 'react';

import {Card, Input, SimpleGrid, VStack} from "@chakra-ui/react";

import Course from "@/components/Courses/Course";
import CourseModal from "@/components/Courses/CourseModal";

import useCourseModal from "@/hooks/feed/useCourseModal";
import useCourses from "@/hooks/queries/useCourses";

const Courses = () => {

    const { isOpen, onClose, courseId, openCourseModal } = useCourseModal();

    const { hits, refine } = useCourses();

    return (
        <>
            {
                courseId && (
                    <CourseModal
                        isOpen={isOpen}
                        onClose={onClose}
                        courseId={courseId}
                    />
                )
            }
            <VStack
                spacing={4}
            >
                <Card>
                    <Input
                        placeholder={'Search for a course'}
                        onChange={(e) => refine(e.target.value)}
                        focusBorderColor={'brand.500'}
                    />
                </Card>
                <SimpleGrid
                    columns={{
                        base: 1,
                        md: 3
                    }}
                    spacing={4}
                    w={'100%'}
                >
                    {
                        hits.map(course => (
                            <Course
                                key={course.objectID}
                                courseId={course.objectID}
                                onClick={() => openCourseModal(course.objectID)}
                            />
                        ))
                    }
                </SimpleGrid>
            </VStack>
        </>
    );
};

export default Courses;
