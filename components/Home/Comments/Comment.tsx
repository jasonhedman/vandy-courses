import React from 'react';

import {Text, useColorModeValue, VStack} from "@chakra-ui/react";

import { Comment as CommentType } from "@/types/Comment";

interface Props {
    comment: CommentType
}

const Comment: React.FC<Props> = ({ comment }) => {

    const borderColor = useColorModeValue('blackAlpha.400', 'whietAlpha.400')

    return (
        <VStack
            w={'100%'}
            align={'start'}
            borderWidth={0.5}
            borderColor={borderColor}
            rounded={'md'}
            p={2}
        >
            <Text>
                {comment.content}
            </Text>
        </VStack>
    );
};

export default Comment;
