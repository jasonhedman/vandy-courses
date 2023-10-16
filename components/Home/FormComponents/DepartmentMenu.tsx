import React from 'react';

import AutoCompleteMenu from "@/components/Utilities/AutoCompleteMenu";

interface Props {
    setDepartment: (professor: string | null) => void,
    onBlur?: () => void,
    error?: string,
}

const departments = [
    "CS",
    "MATH",
    "PHYS",
    "CHEM",
    "BIO",
    "ECON",
    "ENGL",
]

const DepartmentMenu: React.FC<Props> = ({ setDepartment, onBlur, error }) => {

    return (
        <AutoCompleteMenu
            label={"Department"}
            placeholder={"Find a Department"}
            optionLabels={departments}
            options={departments}
            onSelect={setDepartment}
            onBlur={onBlur}
            error={error}
        />
    );
};

export default DepartmentMenu;
