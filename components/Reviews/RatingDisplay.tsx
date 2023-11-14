import React from 'react';
import {Box, CircularProgress, Text, VStack} from "@chakra-ui/react";

interface Props {
    rating: number;
    maxRating: number;
    label: string;
    color: string;
    size?: string;
}

const RatingDisplay: React.FC<Props> = ({ rating, maxRating, label, color, size = "100px" }) => {

    return (
        <VStack
            spacing={0}
        >
            <Box
                position={'relative'}
                boxSize={size}
            >
                <CircularProgress
                    max={maxRating}
                    value={rating}
                    color={color}
                    size={size}
                    capIsRound
                    trackColor='transparent'
                />
                <Text
                    position={'absolute'}
                    top={'50%'}
                    left={'50%'}
                    transform={'translate(-50%, -50%)'}
                    fontSize={'sm'}
                    fontWeight={'bold'}
                >
                    {rating}/{maxRating}
                </Text>
            </Box>
            <Text
                fontSize={'sm'}
                fontWeight={'medium'}
            >
                {label}
            </Text>
        </VStack>
    );
};

export default RatingDisplay;
