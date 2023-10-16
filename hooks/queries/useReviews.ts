import {orderBy, query, where, QueryConstraint} from "@firebase/firestore";

import {useCollectionData} from "react-firebase-hooks/firestore";

import reviewsCollection from "@/firebase/firestore/converters/reviewConverter";

import {Course} from "@/types/Course";
import {Professor} from "@/types/Professor";

const useReviews = (course: Course | null, professor: Professor | null) => {

    const queryParams: QueryConstraint[] = [
        orderBy("score", "desc"),
    ];

    if (course) {
        queryParams.push(where("courseId", "==", course.id));
    }

    if (professor) {
        queryParams.push(where("professor.id", "==", professor.id));
    }

    // TODO: add configurable querying
    const [reviews, loading, error] = useCollectionData(query(
        reviewsCollection,
        ...queryParams
    ));

    return {
        reviews: reviews === undefined ? [] : reviews.filter((review) => review.id),
        loading,
        error
    }

}

export default useReviews;