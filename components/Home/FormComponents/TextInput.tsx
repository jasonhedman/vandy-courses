import React, {ChangeEvent} from 'react';

import {Input} from "@chakra-ui/react";

import FormElement from "@/components/Home/FormComponents/FormElement";

interface Props {
    label: string,
    placeholder: string,
    value: string,
    onChange: (value: string) => void,
    onBlur?: () => void,
    error?: string,
}

const TextInput: React.FC<Props> = ({ label, placeholder, value, onChange, onBlur, error}) => {
    return (
        <FormElement label={label} error={error}>
            <Input
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
                placeholder={placeholder}
                onBlur={onBlur}
                focusBorderColor={"brand.500"}
            />
        </FormElement>
    );
};

export default TextInput;
