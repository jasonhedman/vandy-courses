import React from 'react';

import {Card, Flex} from "@chakra-ui/react";

import WriteReviewButton from "@/components/Home/ExploreHeader/WriteReviewButton";
import ProfessorMenu from "@/components/Utilities/FormComponents/ProfessorMenu";
import CourseMenu from "@/components/Utilities/FormComponents/CourseMenu";

import {Course} from "@/types/Course";
import {Professor} from "@/types/Professor";

interface Props {
    course: Course | null,
    setCourse: (course: Course | null) => void,
    professor: Professor | null,
    setProfessor: (professor: Professor | null) => void,
}

const ExploreHeader: React.FC<Props> = ({ setCourse, setProfessor }) => {
    return (
        <Card>
            <Flex
                justifyContent={'space-between'}
                alignItems={'flex-end'}
                gap={4}
            >
                <CourseMenu
                    setCourse={setCourse}
                />
                <ProfessorMenu
                    setProfessor={setProfessor}
                />
                <WriteReviewButton />
            </Flex>
        </Card>
    );
};

export default ExploreHeader;
