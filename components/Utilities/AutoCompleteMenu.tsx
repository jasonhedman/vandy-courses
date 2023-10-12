import React, {ChangeEvent} from 'react';

import {
    FormControl,
    FormHelperText,
    FormLabel, Icon,
    InputGroup,
    InputRightElement,
    useColorModeValue
} from "@chakra-ui/react";

import {AutoComplete, AutoCompleteInput, AutoCompleteItem, AutoCompleteList} from "@choc-ui/chakra-autocomplete";
import {FiChevronDown, FiChevronRight} from "react-icons/fi";

interface Props<T> {
    label: string;
    optionLabels: string[];
    options: T[];
    onSelect: (value: T | null) => void;
    onBlur?: () => void;
    helperText?: string;
    helperTextColor?: string;
    placeholder?: string;
}

const AutoCompleteMenu = <T,>({ label, optionLabels, options, onSelect, onBlur, helperText, helperTextColor, placeholder }: Props<T>) => {

    const menuBackground = useColorModeValue('white', '#2D2D2D');
    const menuBorderColor = useColorModeValue("gray.200", "whiteAlpha.300");

    return (
        <FormControl
            colorScheme={'brand'}
            py={0}
        >
            <FormLabel>{label}</FormLabel>
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
            {
                helperText && (
                    <FormHelperText
                        color={helperTextColor}
                    >
                        {helperText}
                    </FormHelperText>
                )
            }
        </FormControl>
    );
};

export default AutoCompleteMenu;
