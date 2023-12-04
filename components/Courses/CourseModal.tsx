import React from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    Text,
    Heading,
    VStack,
    ModalFooter,
    Divider,
    HStack,
    Skeleton
} from "@chakra-ui/react";

import CourseBadges from "@/components/Courses/CourseBadges";
import Reviews from "@/components/Reviews";
import SortByRadio from "@/components/Utilities/SortByRadio";

import useReviews from "@/hooks/queries/useReviews";
import useCourse from "@/hooks/queries/useCourse";

interface Props {
    isOpen: boolean,
    onClose: () => void,
    courseId: string
}

const CourseModal: React.FC<Props> = ({ isOpen, onClose, courseId }) => {

    const { course, loading: courseLoading } = useCourse(courseId);


    const { reviews, loading, sortBy, setSortBy } = useReviews({
        courseId,
        professor: null
    });

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size={'2xl'}
            scrollBehavior={'inside'}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader />
                <ModalCloseButton />
                <ModalBody>
                    {
                        (courseLoading || !course) ? (
                            <Skeleton />
                        ) : (
                            <VStack
                                align={'start'}
                                spacing={4}
                            >
                                <HStack>
                                    <VStack
                                        align={'start'}
                                    >
                                        <CourseBadges course={course} />
                                        <Heading
                                            size={'md'}
                                            fontWeight={'bold'}
                                            mb={0}
                                        >
                                            {course.name}
                                        </Heading>
                                        <Text>
                                            {course.description}
                                        </Text>
                                    </VStack>
                                </HStack>
                                <Divider />
                                <Heading
                                    size={'md'}
                                    fontWeight={'bold'}
                                    mb={0}
                                >
                                    Reviews
                                </Heading>
                                <SortByRadio
                                    sortBy={sortBy}
                                    setSortBy={setSortBy}
                                />
                                {
                                    loading ? (
                                        <Skeleton />
                                    ) : (
                                        <Reviews reviews={reviews} />
                                    )
                                }
                            </VStack>
                        )
                    }
                </ModalBody>
                <ModalFooter />
            </ModalContent>
        </Modal>
    );
};

export default CourseModal;