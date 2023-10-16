import React from 'react';

import AutoCompleteMenu from "@/components/Utilities/AutoCompleteMenu";

interface Props {
    department: string | null,
    setDepartment: (professor: string | null) => void,
    onBlur?: () => void,
    error?: string,
    closeButton?: boolean
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

const DepartmentMenu: React.FC<Props> = ({ department, setDepartment, onBlur, error, closeButton }) => {

    return (
        <AutoCompleteMenu
            value={department}
            label={"Department"}
            placeholder={"Find a Department"}
            optionLabels={departments}
            options={departments}
            onSelect={setDepartment}
            onBlur={onBlur}
            error={error}
            closeButton={closeButton}
        />
    );
};

export default DepartmentMenu;
