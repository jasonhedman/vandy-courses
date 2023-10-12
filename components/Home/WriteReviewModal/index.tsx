import React from 'react';

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    VStack
} from '@chakra-ui/react'

import CourseMenu from "@/components/Home/FormComponents/CourseMenu";
import ProfessorMenu from "@/components/Home/FormComponents/ProfessorMenu";

import useCreateReview from "@/hooks/mutators/useCreateReview";

interface Props {
    isOpen: boolean,
    onClose: () => void
}

const WriteReviewModal: React.FC<Props> = ({ isOpen, onClose }) => {

    const { touched, errors, handleSubmit, setFieldValue, setFieldTouched, disabled } = useCreateReview();

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Write a Review</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack>
                        <CourseMenu
                            setCourse={(course) => {
                                setFieldValue('courseId', course?.id || "")
                            }}
                            onBlur={() => setFieldTouched("courseId", true)}
                            error={touched.courseId ? errors.courseId : undefined}
                        />
                        <ProfessorMenu
                            setProfessor={(professor) => {
                                if(professor === null) {
                                    setFieldValue('professor.id', "");
                                    setFieldValue('professor.name', "");
                                } else {
                                    setFieldValue('professor', professor)
                                }
                            }}
                            onBlur={() => {
                                setFieldTouched("professor.id", true)
                                setFieldTouched("professor.name", true)
                            }}
                            error={touched.professor?.name ? errors.professor?.name : undefined}
                        />
                    </VStack>
                </ModalBody>
                <ModalFooter
                    justifyContent={'space-between'}
                >
                    <Button
                        variant='ghost'
                        onClick={onClose}
                    >
                        Close
                    </Button>
                    <Button
                        variant='ghost'
                        onClick={() => handleSubmit()}
                        isDisabled={disabled}
                    >
                        Submit
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default WriteReviewModal;
