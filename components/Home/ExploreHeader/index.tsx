import React from 'react';

import {Card, Flex} from "@chakra-ui/react";

import WriteReviewButton from "@/components/Home/ExploreHeader/WriteReviewButton";
import ProfessorMenu from "@/components/Utilities/FormComponents/ProfessorMenu";
import CourseMenu from "@/components/Utilities/FormComponents/CourseMenu";

import {Professor} from "@/types/Professor";

interface Props {
    courseId: string | null,
    setCourseId: (courseId: string | null) => void,
    professor: Professor | null,
    setProfessor: (professor: Professor | null) => void,
}

const ExploreHeader: React.FC<Props> = ({ courseId, setCourseId, professor, setProfessor }) => {
    return (
        <Card>
            <Flex
                justifyContent={'space-between'}
                alignItems={'flex-end'}
                gap={4}
            >
                <CourseMenu
                    courseId={courseId}
                    setCourseId={setCourseId}
                    closeButton
                />
                <ProfessorMenu
                    professor={professor}
                    setProfessor={setProfessor}
                    closeButton
                />
                <WriteReviewButton />
            </Flex>
        </Card>
    );
};

export default ExploreHeader;
