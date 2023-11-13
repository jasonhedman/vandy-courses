import React from 'react';

import {Skeleton, VStack} from "@chakra-ui/react";

import ExploreHeader from "@/components/Home/ExploreHeader";
import Reviews from "@/components/Home/Reviews";

import useFeed from "@/hooks/feed/useFeed";

const HomePage = () => {

    const {
        courseId,
        setCourseId,
        professor,
        setProfessor,
        sortBy,
        setSortBy,
        reviews,
        loading,
    } = useFeed();

    return (
        <VStack
            w={'100%'}
            spacing={4}
        >
            <ExploreHeader
                courseId={courseId}
                setCourseId={setCourseId}
                professor={professor}
                setProfessor={setProfessor}
                sortBy={sortBy}
                setSortBy={setSortBy}
            />
            {
                loading ? (
                    <Skeleton
                        w={'100%'}
                    />
                ) : (
                    <Reviews
                        reviews={reviews}
                        setCourseId={setCourseId}
                        setProfessor={setProfessor}
                    />
                )
            }
        </VStack>
    );
};

export default HomePage;
