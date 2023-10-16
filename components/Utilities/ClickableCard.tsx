import React from 'react';

import { Card } from "@chakra-ui/react";

import { CardProps } from "@chakra-ui/card";

interface Props extends CardProps {
    onClick: () => void,
    children: React.ReactNode
}

const ClickableCard: React.FC<Props> = ({ onClick, children, ...props }) => {

    return (
        <Card
            cursor={'pointer'}
            _hover={{
                opacity: 0.75
            }}
            onClick={onClick}
            transition={'all 0.2s ease-in-out'}
            {...props}
        >
            {children}
        </Card>
    );
};

export default ClickableCard;
