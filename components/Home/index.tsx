import React from 'react';
import {Heading, VStack} from "@chakra-ui/react";
import Steps from "@/components/Home/Steps";

const HomePage = () => {
    return (
        <VStack
            w={'100%'}
            spacing={8}
        >
            <Heading
                size={'lg'}
            >
                Welcome to Vandy Courses
            </Heading>
            <Steps />
        </VStack>
    );
};

export default HomePage;
