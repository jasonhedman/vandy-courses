import React, { useState } from 'react';
import { Button, Input, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import FormElement from "@/components/Utilities/FormComponents/FormElement";

interface Props {
    options: string[] | null,
    selectedOption: string | null,
    setSelectedOption: (selected: String | null) => void,
    onBlur?: () => void,
    error?: string,
    closeButton?: boolean
}
const SelectInput: React.FC<Props>  = ( {options, selectedOption, setSelectedOption, onBlur, error, closeButton} ) => {

  return (
    <FormElement
      label={"Select a report type"}
      error={error}
    >
      <Menu
        onSelect={setSelectedOption}
        onBlur={onBlur}
        closeButton={closeButton}
      >
        <MenuButton as={Button}>
          {selectedOption}
        </MenuButton>
        <MenuList>
          {options?.map((option, index) => (
            <MenuItem key={index} onClick={() => setSelectedOption(option)}>{option}</MenuItem>
          ))}
        </MenuList>
      </Menu>
    </FormElement>
  );
};
export default SelectInput;