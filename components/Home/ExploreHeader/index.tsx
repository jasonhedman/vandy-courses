import React from 'react';

import {Card, Flex, VStack} from "@chakra-ui/react";

import WriteReviewButton from "@/components/Home/ExploreHeader/WriteReviewButton";
import ProfessorMenu from "@/components/Utilities/FormComponents/ProfessorMenu";
import CourseMenu from "@/components/Utilities/FormComponents/CourseMenu";

import {Professor} from "@/types/Professor";
import {SortBy} from "@/types/SortBy";
import SortByRadio from "@/components/Utilities/SortByRadio";

interface Props {
    courseId: string | null,
    setCourseId: (courseId: string | null) => void,
    professor: Professor | null,
    setProfessor: (professor: Professor | null) => void,
    sortBy: SortBy,
    setSortBy: (sortBy: SortBy) => void,
}

const ExploreHeader: React.FC<Props> = ({ courseId, setCourseId, professor, setProfessor, sortBy, setSortBy }) => {
    return (
        <Card>
            <VStack
                w={'100%'}
                spacing={4}
                alignItems={'flex-start'}
            >
                <Flex
                    justifyContent={'space-between'}
                    alignItems={'flex-end'}
                    gap={4}
                    w={'100%'}
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
                <SortByRadio
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                />
            </VStack>
        </Card>
    );
};

export default ExploreHeader;
