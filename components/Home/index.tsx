import React from 'react';

import {Skeleton, VStack} from "@chakra-ui/react";

import ExploreHeader from "@/components/Home/ExploreHeader";
import Reviews from "@/components/Home/Reviews";

import useFeed from "@/hooks/feed/useFeed";

const HomePage = () => {

    const {
        course,
        setCourse,
        professor,
        setProfessor,
        reviews,
        loading,
    } = useFeed();

    return (
        <VStack
            w={'100%'}
            spacing={4}
        >
            <ExploreHeader
                course={course}
                setCourse={setCourse}
                professor={professor}
                setProfessor={setProfessor}
            />
            {
                loading ? (
                    <Skeleton />
                ) : (
                    <Reviews
                        reviews={reviews}
                    />
                )
            }
        </VStack>
    );
};

export default HomePage;
