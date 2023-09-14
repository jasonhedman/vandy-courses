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
                color={'white'}
            >
                Welcome to Vandy Courses
            </Heading>
            <Steps />
        </VStack>
    );
};

export default HomePage;
