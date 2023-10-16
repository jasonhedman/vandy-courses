import {orderBy, query} from "@firebase/firestore";

import {useCollectionData} from "react-firebase-hooks/firestore";

import reviewsCollection from "@/firebase/firestore/converters/reviewConverter";

import {Course} from "@/types/Course";
import {Professor} from "@/types/Professor";

const useReviews = (course: Course | null, professor: Professor | null) => {

    // TODO: add configurable querying
    const [reviews, loading, error] = useCollectionData(query(
        reviewsCollection,
        orderBy("score", "desc")
    ));

    return {
        reviews: reviews === undefined ? [] : reviews.filter((review) => review.id),
        loading,
        error
    }

}

export default useReviews;