import React, {ChangeEvent} from 'react';

import {
    Icon,
    InputGroup,
    InputRightElement,
    useColorModeValue
} from "@chakra-ui/react";

import {AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList} from "@choc-ui/chakra-autocomplete";
import {FiChevronDown, FiChevronRight} from "react-icons/fi";
import FormElement from "@/components/Home/FormComponents/FormElement";

interface Props<T> {
    label: string;
    optionLabels: string[];
    options: T[];
    onSelect: (value: T | null) => void;
    onBlur?: () => void;
    error?: string;
    placeholder?: string;
}

const AutoCompleteMenu = <T,>({ label, optionLabels, options, onSelect, onBlur, error, placeholder }: Props<T>) => {

    const menuBackground = useColorModeValue('white', '#2D2D2D');
    const menuBorderColor = useColorModeValue("gray.200", "whiteAlpha.300");

    return (
        <FormElement
            label={label}
            error={error}
        >
            <AutoComplete
                openOnFocus
                restoreOnBlurIfEmpty={false}
            >
                {({ isOpen }: { isOpen: boolean }) => (
                    <>
                        <InputGroup>
                            <AutoCompleteInput
                                variant="outline"
                                placeholder={placeholder}
                                focusBorderColor="brand.500"
                                onBlur={onBlur}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                    if (e.target.value === "") {
                                        onSelect(null);
                                    }
                                }}
                            />
                            <InputRightElement>
                                <Icon as={isOpen ? FiChevronRight : FiChevronDown} />
                            </InputRightElement>
                        </InputGroup>
                        <AutoCompleteList
                            bg={menuBackground}
                            p={0}
                            border='1px solid'
                            borderColor={menuBorderColor}
                        >
                            {options.map((option, id) => (
                                <AutoCompleteItem
                                    key={`option-${id}`}
                                    value={optionLabels[id]}
                                    textTransform="capitalize"
                                    m={0}
                                    onClick={() => onSelect(option)}

                                >
                                    {optionLabels[id]}
                                </AutoCompleteItem>
                            ))}
                        </AutoCompleteList>
                    </>
                )}
            </AutoComplete>
        </FormElement>
    );
};

export default AutoCompleteMenu;
