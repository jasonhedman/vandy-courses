import { useState } from "react";

import useAuth from "@/hooks/auth/useAuth";

import {deleteReview} from "@/services/reviews";

const useDeleteReview = (reviewId: string) => {
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [isDeleted, setIsDeleted] = useState(false);

    const onDelete = async () => {
        if (loading || !user) return;

        setLoading(true);

        try {
            await deleteReview(reviewId);
            setIsDeleted(true);
        } catch (error) {
            console.error("Failed to delete the review:", error);
            // Handle the error appropriately
        } finally {
            setLoading(false);
        }
    };

    return { isDeleted, onDelete, loading };
};

export default useDeleteReview;