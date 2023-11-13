import React, {ChangeEvent} from 'react';

import {HStack, Input} from "@chakra-ui/react";

import FormElement from "@/components/Utilities/FormComponents/FormElement";

interface Props {
    label: string,
    placeholder: string,
    value: string,
    onChange: (value: string) => void,
    description?: string,
    onBlur?: () => void,
    error?: string,
    button?: React.ReactNode
}

const TextInput: React.FC<Props> = ({ label, placeholder, value, onChange, description, onBlur, error, button}) => {
    return (
        <FormElement
            label={label}
            error={error}
            description={description}
        >
            <HStack
                w={'100%'}
            >
                <Input
                    value={value}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                    placeholder={placeholder}
                    onBlur={onBlur}
                    focusBorderColor={"brand.500"}
                    flex={1}
                />
                {button}
            </HStack>
        </FormElement>
    );
};

export default TextInput;
