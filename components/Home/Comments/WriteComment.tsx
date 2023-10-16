import React from 'react';

import {Button, HStack} from "@chakra-ui/react";

import TextInput from "@/components/Utilities/FormComponents/TextInput";

import useCreateComment from "@/hooks/mutators/useCreateComment";


interface Props {
    reviewId: string
}

const WriteComment: React.FC<Props> = ({ reviewId }) => {

    const { values, setFieldValue, setFieldTouched, touched, errors, disabled, handleSubmit} = useCreateComment(reviewId);

    return (
        <HStack
            w={'100%'}
        >
            <TextInput
                label={"Write Comment"}
                placeholder={"Write your comment here"}
                value={values.content}
                onChange={(value) => setFieldValue('content', value)}
                error={touched.content ? errors.content : undefined}
                onBlur={() => setFieldTouched('content')}
                button={
                    <Button
                        colorScheme={"brand"}
                        isDisabled={disabled}
                        onClick={() => handleSubmit()}
                    >
                        Submit
                    </Button>
                }
            />
        </HStack>
    );
};

export default WriteComment;
