import {orderBy, query, where, QueryConstraint} from "@firebase/firestore";

import {useCollectionData} from "react-firebase-hooks/firestore";

import {reviewsCollection} from "@/firebase/firestore/converters/reviewConverter";

import {Course} from "@/types/Course";
import {Professor} from "@/types/Professor";

// custom hook to get all reviews for a course or professor
const useReviews = (course: Course | null, professor: Professor | null) => {

    // order reviews by score
    const queryParams: QueryConstraint[] = [
        orderBy("score", "desc"),
    ];

    // add additional query parameters if a course or professor is specified

    if (course) queryParams.push(where("courseId", "==", course.id));
    if (professor) queryParams.push(where("professor.id", "==", professor.id));

    // get all reviews for a course or professor, ordered by score
    const [reviews, loading, error] = useCollectionData(query(
        reviewsCollection,
        ...queryParams
    ));

    return {
        // filter out any reviews with undefined IDs (which must be added to the record after creation)
        reviews: reviews === undefined ? [] : reviews.filter((review) => review.id),
        loading,
        error
    }

}

export default useReviews;