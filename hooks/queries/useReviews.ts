import {useState} from "react";

import {orderBy, query, where, QueryConstraint} from "@firebase/firestore";

import {useCollectionData} from "react-firebase-hooks/firestore";

import {reviewsCollection} from "@/firebase/firestore/converters/reviewConverter";

import {Professor} from "@/types/Professor";
import {SortBy} from "@/types/SortBy";

interface UseReviewsProps {
    courseId: string | null,
    professor: Professor | null,
    minReports?: number
    userId?: string
}

const useReviews = (props: UseReviewsProps) => {

    const {courseId, professor, minReports, userId} = props;

    const [sortBy, setSortBy] = useState<SortBy>(SortBy.Newest);

    // order reviews by score
    const queryParams: QueryConstraint[] = [
        orderBy(
            minReports
                ? 'numReports'
                : sortBy === SortBy.Newest
                    ? 'createdAt'
                    : 'score',
            "desc"
        ),
    ];

    if (courseId) queryParams.push(where("courseId", "==", courseId));
    if (professor) queryParams.push(where("professor.id", "==", professor.id));
    if (minReports) queryParams.push(where("numReports", ">=", minReports));
    if (userId) queryParams.push(where("userId", "==", userId));

    // get all reviews for a course or professor, ordered by score
    const [reviews, loading, error] = useCollectionData(query(
        reviewsCollection,
        ...queryParams
    ));

    return {
        // filter out any reviews with undefined IDs (which must be added to the record after creation)
        reviews: reviews === undefined ? [] : reviews.filter((review) => review.id),
        sortBy,
        setSortBy,
        loading,
        error
    }

}

export default useReviews;