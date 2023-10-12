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
import TextInput from "@/components/Home/FormComponents/TextInput";
import CheckboxInput from "@/components/Home/FormComponents/CheckboxInput";
import SliderInput from "@/components/Home/FormComponents/SliderInput";
import {MAXIMUM_RATING} from "@/data/reviewConstants";

interface Props {
    isOpen: boolean,
    onClose: () => void
}

const WriteReviewModal: React.FC<Props> = ({ isOpen, onClose }) => {

    const { touched, errors, values, handleSubmit, setFieldValue, setFieldTouched, disabled } = useCreateReview();

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            variant={'outline'}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Write a Review</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack
                        spacing={4}
                    >
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
                        <TextInput
                            label={"Title"}
                            placeholder={"Review Title"}
                            value={values.title}
                            onChange={(value) => setFieldValue('title', value)}
                            onBlur={() => setFieldTouched("title", true)}
                            error={touched.title ? errors.title : undefined}
                        />
                        <SliderInput
                            label={"Difficulty"}
                            value={values.difficulty}
                            onChange={(value) => setFieldValue('difficulty', value)}
                            min={1}
                            max={MAXIMUM_RATING}
                        />
                        <CheckboxInput
                            label={"Take Home Exams"}
                            value={values.takeHomeExams}
                            onChange={(value) => setFieldValue('takeHomeExams', value)}
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
                        variant='solid'
                        colorScheme='brand'
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
