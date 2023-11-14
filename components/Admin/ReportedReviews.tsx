import React from 'react';
import useReviews from "@/hooks/queries/useReviews";
import Reviews from "@/components/Reviews";
import {Skeleton} from "@chakra-ui/react";

const ReportedReviews = () => {

    const { reviews, loading } = useReviews({
        courseId: null,
        professor: null,
        minReports: 1
    });

    if(loading) return (
        <Skeleton
            w={'100%'}
        />
    );

    return (
        <Reviews 
            reviews={reviews}
            admin
        />
    );
};

export default ReportedReviews;
