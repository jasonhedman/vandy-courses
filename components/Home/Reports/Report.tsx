import React from 'react';

import { Report as ReportType } from "@/types/Report";
import {Badge, Box, Text, useColorModeValue} from "@chakra-ui/react";

interface Props {
    report: ReportType
}

const Report: React.FC<Props> = ({ report }) => {

    const borderColor = useColorModeValue('blackAlpha.400', 'whiteAlpha.400');

    return (
        <Box
            borderWidth={0.5}
            borderColor={borderColor}
            rounded={'md'}
            w={'100%'}
            p={2}
        >
            <Badge>
                {report.type}
            </Badge>
            <Text>
                {report.description}
            </Text>
        </Box>
    );
};

export default Report;
