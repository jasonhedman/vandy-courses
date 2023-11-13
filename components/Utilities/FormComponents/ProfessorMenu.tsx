import React, { useState, useEffect } from 'react';

import AutoCompleteMenu from "@/components/Utilities/AutoCompleteMenu";

import useProfessors from "@/hooks/queries/useProfessors";
import {Professor} from "@/types/Professor";

interface Props {
    professor: Professor | null,
    setProfessor: (professor: Professor | null) => void,
    onBlur?: () => void,
    error?: string,
    closeButton?: boolean
}

const ProfessorMenu: React.FC<Props> = ({ professor, setProfessor, onBlur, error, closeButton }) => {

    const { professors } = useProfessors();

    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        if (professor) {
            setInputValue(professor.name);
        } else {
            setInputValue("");
        }
    }, [professor]);

    return (
        <AutoCompleteMenu
            label={"Professor"}
            value={professor}
            inputValue={inputValue}
            setInputValue={setInputValue}
            placeholder={"Find a Professor"}
            optionLabels={(professors || []).map(professor => professor.name)}
            options={professors || []}
            onSelect={setProfessor}
            onBlur={onBlur}
            error={error}
            closeButton={closeButton}
        />
    );
};

export default ProfessorMenu;
