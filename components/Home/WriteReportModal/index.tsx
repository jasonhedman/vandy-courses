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
import useCreateReport from "@/hooks/mutators/useCreateReport";
import SelectInput from '@/components/Utilities/FormComponents/SelectInput';
import { ReportType } from '@/types/Report';

interface Props {
    reviewId: string,
    isOpen: boolean,
    onClose: () => void,
}

const WriteReportModal: React.FC<Props> = ({ reviewId, isOpen, onClose }) => {

    const { touched, errors, values, handleSubmit, setFieldValue, setFieldTouched, disabled } = useCreateReport(reviewId);

    // Used to get array of report options, to display as menu options
    const enumValuesToStringArray = (e: any) => {
        return Object.keys(e).filter(k => typeof e[k as any] === 'string') as string[];
    };
    const reportOptions = enumValuesToStringArray(ReportType);
    
    const onSubmit = async () => {
        // // Set id of the review currently opened into report input field
        // setFieldValue('reviewId', reviewId);
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
                <ModalHeader>Write a Report</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack
                        spacing={4}
                    >
                        <SelectInput
                            options={reportOptions}
                            selectedOption={values.type}
                            setSelectedOption={(reportType) => {
                                setFieldValue('type', reportType);
                                console.log(reportType);
                                console.log(errors);
                            }}
                            onBlur={() => setFieldTouched('type', true)}
                            error={touched.type ? errors.type : undefined}
                        />
                        <TextareaInput
                            label={"Description"}
                            placeholder={"Write your optional report description here"}
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
