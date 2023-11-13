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

import TextareaInput from "@/components/Utilities/FormComponents/TextareaInput";
import SelectInput from '@/components/Utilities/FormComponents/SelectInput';

import useCreateReport from "@/hooks/mutators/useCreateReport";

import { ReportType } from '@/types/Report';

interface Props {
    reviewId: string,
    isOpen: boolean,
    onClose: () => void,
}

const WriteReportModal: React.FC<Props> = ({ reviewId, isOpen, onClose }) => {

    const { touched, errors, values, handleSubmit, setFieldValue, setFieldTouched, disabled } = useCreateReport(reviewId);

    const onSubmit = async () => {
        await handleSubmit();
        onClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            variant={'outline'}
            size={'2xl'}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Write a Report
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack
                        spacing={4}
                    >
                        <SelectInput
                            options={Object.values(ReportType)}
                            selectedOption={values.type}
                            setSelectedOption={(reportType) => {
                                setFieldValue('type', reportType);
                            }}
                            onBlur={() => setFieldTouched('type', true)}
                            error={touched.type ? errors.type : undefined}
                        />
                        <TextareaInput
                            label={"Description"}
                            placeholder={"Write your report description here..."}
                            value={values.description}
                            onChange={(value) => {
                                setFieldValue('description', value);
                            }}
                            onBlur={() => setFieldTouched('description', true)}
                            error={touched.description ? errors.description : undefined}
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

export default WriteReportModal;
