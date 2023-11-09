import { useState } from "react";

import useAuth from "@/hooks/auth/useAuth";

import {deleteReview} from "@/services/reviews";
import {useToast} from "@chakra-ui/react";

const useDeleteReview = (reviewId: string) => {

    const { user } = useAuth();

    const toast = useToast();

    const [loading, setLoading] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const onDelete = async () => {
        if (loading || !user) return;
        setLoading(true);
        const deleted = await deleteReview(reviewId);
        setIsDeleted(deleted);
        setLoading(false);
        if(deleted) {
            toast({
                title: "Review deleted.",
                description: "Your review has been deleted.",
                status: "success",
                duration: 5000,
                isClosable: true,
            })
        } else {
            toast({
                title: "Review not deleted.",
                description: "Your review could not be deleted.",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        }
    };

    return { isDeleted, onDelete, loading };
};

export default useDeleteReview;
