import React from 'react';
import {Card, Heading, Text} from "@chakra-ui/react";

const AdminHeader = () => {
    return (
        <Card
            w={'100%'}
        >
            <Heading
                size={'md'}
            >
                Reported Reviews
            </Heading>
            <Text>
                These reviews have been reported by users. You can view them here and delete them if necessary.
            </Text>
        </Card>
    );
};

export default AdminHeader;
