import React, { useState, useEffect } from 'react';

import AutoCompleteMenu from "@/components/Utilities/AutoCompleteMenu";

import useProfessors from "@/hooks/queries/useProfessors";
import {Professor} from "@/types/Professor";

interface Props {
    professor: Professor | null,
    setProfessor: (professor: Professor | null) => void,
    description?: string,
    onBlur?: () => void,
    error?: string,
    closeButton?: boolean
}

const ProfessorMenu: React.FC<Props> = ({ professor, setProfessor, description, onBlur, error, closeButton }) => {

    const { hits, refine } = useProfessors();

    const [inputValue, setInputValue] = useState<string>("");

    useEffect(() => {
        if (professor) {
            setInputValue(professor.name);
        } else {
            setInputValue("");
        }
    }, [professor]);

    const handleInputChange = (val: string) => {
        setInputValue(val);
        refine(val);
    }

    return (
        <AutoCompleteMenu
            label={"Professor"}
            value={professor}
            description={description}
            inputValue={inputValue}
            setInputValue={handleInputChange}
            placeholder={"Find a Professor"}
            options={hits.map(professor => ({
                id: professor.objectID,
                name: professor.name as string
            })) || []}
            optionLabels={(hits || []).map(professor => professor.name as string)}
            onSelect={setProfessor}
            onBlur={onBlur}
            error={error}
            closeButton={closeButton}
        />
    );
};

export default ProfessorMenu;
