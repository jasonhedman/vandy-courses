import {useState} from "react";

import {orderBy, query, where, QueryConstraint} from "@firebase/firestore";

import {useCollectionData} from "react-firebase-hooks/firestore";

import {reviewsCollection} from "@/firebase/firestore/converters/reviewConverter";

import {Professor} from "@/types/Professor";
import {SortBy} from "@/types/SortBy";

const useReviews = (courseId: string | null, professor: Professor | null) => {

    const [sortBy, setSortBy] = useState<SortBy>(SortBy.Newest);

    // order reviews by score
    const queryParams: QueryConstraint[] = [
        orderBy(
            sortBy === SortBy.Newest ? 'createdAt' : 'score',
            "desc"
        ),
    ];

    if (courseId) queryParams.push(where("courseId", "==", courseId));
    if (professor) queryParams.push(where("professor.id", "==", professor.id));

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