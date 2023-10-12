import React from 'react';

import AutoCompleteMenu from "@/components/Utilities/AutoCompleteMenu";

import useProfessors from "@/hooks/queries/useProfessors";

interface Props {
    setProfessor: (professor: any) => void,
    onBlur?: () => void,
    error?: string,
}

const ProfessorMenu: React.FC<Props> = ({ setProfessor, onBlur, error }) => {

    const { professors } = useProfessors();

    return (
        <AutoCompleteMenu
            label={"Professor"}
            placeholder={"Find a Professor"}
            optionLabels={(professors || []).map(professor => professor.name)}
            options={professors || []}
            onSelect={setProfessor}
            onBlur={onBlur}
            error={error}
        />
    );
};

export default ProfessorMenu;
