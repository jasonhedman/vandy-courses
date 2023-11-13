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

import CourseBadges from "@/components/CoursesPage/CourseBadges";
import useReviews from "@/hooks/queries/useReviews";
import Reviews from "@/components/Home/Reviews";

import {Course} from "@/types/Course";

interface Props {
    isOpen: boolean,
    onClose: () => void,
    course: Course
}

const CourseModal: React.FC<Props> = ({ isOpen, onClose, course }) => {

    const { reviews, loading } = useReviews(course.id, null);

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
                        {
                            loading ? (
                                <Skeleton />
                            ) : (
                                <Reviews reviews={reviews} />
                            )
                        }
                    </VStack>
                </ModalBody>
                <ModalFooter />
            </ModalContent>
        </Modal>
    );
};

export default CourseModal;