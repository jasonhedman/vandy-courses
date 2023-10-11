import React from 'react';

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

interface Props {
    label: string;
    options: string[];
    helperText?: string;
    placeholder?: string;
}

const AutoCompleteMenu: React.FC<Props> = ({ label, options, helperText, placeholder }) => {

    const menuBackground = useColorModeValue('white', '#2D2D2D');

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
                            />
                            <InputRightElement>
                                <Icon as={isOpen ? FiChevronRight : FiChevronDown} />
                            </InputRightElement>
                        </InputGroup>
                        <AutoCompleteList
                            bg={menuBackground}
                            p={0}
                        >
                            {options.map((option, id) => (
                                <AutoCompleteItem
                                    key={`option-${id}`}
                                    value={option}
                                    textTransform="capitalize"
                                    m={0}
                                >
                                    {option}
                                </AutoCompleteItem>
                            ))}
                        </AutoCompleteList>
                    </>
                )}
            </AutoComplete>
            {
                helperText && <FormHelperText>{helperText}</FormHelperText>
            }
        </FormControl>
    );
};

export default AutoCompleteMenu;
