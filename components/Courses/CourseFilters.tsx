import React from 'react';

import {Card, Flex} from "@chakra-ui/react";

import DepartmentMenu from "@/components/Utilities/FormComponents/DepartmentMenu";

interface Props {
    department: string | null,
    setDepartment: (course: string | null) => void,
}

const CourseFilters: React.FC<Props> = ({ department, setDepartment }) => {
    return (
        <Card>
            <Flex
                justifyContent={'space-between'}
                alignItems={'flex-end'}
                gap={4}
            >
                <DepartmentMenu
                    department={department}
                    setDepartment={setDepartment}
                />
            </Flex>
        </Card>
    );
};

export default CourseFilters;
