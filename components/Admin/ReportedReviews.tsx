import React from 'react';
import useReviews from "@/hooks/queries/useReviews";
import Reviews from "@/components/Home/Reviews";
import {Skeleton} from "@chakra-ui/react";

const ReportedReviews = () => {

    const { reviews, loading } = useReviews(null, null, 1);

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
