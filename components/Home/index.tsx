import React from 'react';

import {VStack} from "@chakra-ui/react";

import ExploreHeader from "@/components/Home/ExploreHeader";
import Reviews from "@/components/Home/Reviews";

import dummyReviews from "@/data/dummyReviews";

const HomePage = () => {

    return (
        <VStack
            w={'100%'}
            spacing={4}
        >
            <ExploreHeader />
            <Reviews
                reviews={dummyReviews}
            />
        </VStack>
    );
};

export default HomePage;
