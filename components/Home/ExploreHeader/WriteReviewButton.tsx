import React from 'react';

import {Button, useDisclosure} from "@chakra-ui/react";
import WriteReviewModal from "@/components/Home/WriteReviewModal";

const WriteReviewButton = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button
                colorScheme={'brand'}
                flexShrink={0}
                onClick={onOpen}
            >
                Write a Review
            </Button>
            <WriteReviewModal
                isOpen={isOpen}
                onClose={onClose}
            />
        </>

    );
};

export default WriteReviewButton;
