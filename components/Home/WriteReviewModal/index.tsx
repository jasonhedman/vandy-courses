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
import TextInput from "@/components/Home/FormComponents/TextInput";
import SliderInput from "@/components/Home/FormComponents/SliderInput";
import TextareaInput from "@/components/Home/FormComponents/TextareaInput";

import useCreateReview from "@/hooks/mutators/useCreateReview";

import {MAXIMUM_RATING, MINIMUM_RATING} from "@/data/reviewConstants";


interface Props {
    isOpen: boolean,
    onClose: () => void
}

const WriteReviewModal: React.FC<Props> = ({ isOpen, onClose }) => {

    const { touched, errors, values, handleSubmit, setFieldValue, setFieldTouched, disabled } = useCreateReview();

    const onSubmit = async () => {
        await handleSubmit();
        onClose();
    }

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
                        <TextareaInput
                            label={"Content"}
                            placeholder={"Write your review content here"}
                            value={values.content}
                            onChange={(value) => setFieldValue('content', value)}
                            onBlur={() => setFieldTouched("content", true)}
                            error={touched.content ? errors.content : undefined}
                        />
                        <SliderInput
                            label={"Difficulty"}
                            value={values.difficulty}
                            onChange={(value) => setFieldValue('difficulty', value)}
                            min={MINIMUM_RATING}
                            max={MAXIMUM_RATING}
                        />
                        <SliderInput
                            label={"Rating"}
                            value={values.rating}
                            onChange={(value) => setFieldValue('rating', value)}
                            min={MINIMUM_RATING}
                            max={MAXIMUM_RATING}
                        />
                        <SliderInput
                            label={"Skippability"}
                            value={values.skippability}
                            onChange={(value) => setFieldValue('skippability', value)}
                            min={MINIMUM_RATING}
                            max={MAXIMUM_RATING}
                        />
                        <SliderInput
                            label={"Sleepy Score"}
                            value={values.sleepScore}
                            onChange={(value) => setFieldValue('sleepScore', value)}
                            min={MINIMUM_RATING}
                            max={MAXIMUM_RATING}
                        />
                        <SliderInput
                            label={"Effort for an A"}
                            value={values.effortForA}
                            onChange={(value) => setFieldValue('effortForA', value)}
                            min={MINIMUM_RATING}
                            max={MAXIMUM_RATING}
                        />
                        <SliderInput
                            label={"How useful is ChatGPT?"}
                            value={values.chatGptability}
                            onChange={(value) => setFieldValue('chatGptability', value)}
                            min={MINIMUM_RATING}
                            max={MAXIMUM_RATING}
                        />
                        <SliderInput
                            label={"Professor Chill Index"}
                            value={values.profChillScore}
                            onChange={(value) => setFieldValue('profChillScore', value)}
                            min={MINIMUM_RATING}
                            max={MAXIMUM_RATING}
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
                        onClick={onSubmit}
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
