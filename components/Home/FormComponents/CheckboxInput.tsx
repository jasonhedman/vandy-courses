import React from 'react';
import FormElement from "@/components/Home/FormComponents/FormElement";
import {Checkbox} from "@chakra-ui/react";

interface Props {
    label: string,
    value: boolean,
    onChange: (value: boolean) => void,
    onBlur?: () => void,
    error?: string,
}

const CheckboxInput: React.FC<Props> = ({ label, value, onChange, onBlur, error }) => {
    return (
        <FormElement
            label={label}
            error={error}
        >
            <Checkbox
                isChecked={value}
                onChange={(e) => onChange(e.target.checked)}
                onBlur={onBlur}
                colorScheme={"brand"}
            />
        </FormElement>
    );
};

export default CheckboxInput;
