import React from 'react';

import {Card, Heading, Text, VStack} from "@chakra-ui/react";

const NotAdmin = () => {
    return (
        <Card
            p={8}
        >
            <VStack>
                <Heading
                    size={'lg'}
                >
                    Not Authorized
                </Heading>
                <Text>
                    You must be an admin to view this page.
                </Text>
            </VStack>
        </Card>
    );
};

export default NotAdmin;
