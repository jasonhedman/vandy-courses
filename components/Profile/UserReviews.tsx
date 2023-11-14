import React from 'react';
import useReviews from "@/hooks/queries/useReviews";
import {Skeleton, VStack} from "@chakra-ui/react";
import Reviews from "@/components/Reviews";

interface Props {
    userId: string
}

const UserReviews: React.FC<Props> = ({ userId }) => {

    const { reviews, loading } = useReviews({
        courseId: null,
        professor: null,
        userId
    });

    return (
        <VStack
            w={'100%'}
        >
            {
                loading ? (
                    <Skeleton />
                ) : (
                    <Reviews
                        reviews={reviews}
                        profile
                    />
                )
            }
        </VStack>
    );
};

export default UserReviews;
