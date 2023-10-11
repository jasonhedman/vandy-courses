import React from 'react';
import {IconProps, Text, VStack} from "@chakra-ui/react";
import {ChevronDownIcon, ChevronUpIcon} from "@chakra-ui/icons";

interface Props {
    score: number
}

const UpvoteDownvote: React.FC<Props> = ({ score }) => {

    const iconStyles: IconProps = {
        boxSize: '2rem',
        _hover: {
            cursor: 'pointer',
            opacity: 0.5
        },
        transition: 'all 0.2s ease-in-out'
    }

    return (
        <VStack
            spacing={0}
        >
            <ChevronUpIcon
                {...iconStyles}
            />
            <Text
                fontWeight={'bold'}
            >
                {score}
            </Text>
            <ChevronDownIcon
                {...iconStyles}
            />
        </VStack>
    );
};

export default UpvoteDownvote;
