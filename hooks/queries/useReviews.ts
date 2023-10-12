import {query} from "@firebase/firestore";

import {useCollectionData} from "react-firebase-hooks/firestore";

import reviewsCollection from "@/firebase/firestore/converters/reviewConverter";

import {Course} from "@/types/Course";
import {Professor} from "@/types/Professor";

const useReviews = (course: Course | null, professor: Professor | null) => {

    // TODO: add configurable querying
    const [reviews, loading, error] = useCollectionData(query(reviewsCollection));

    return {
        reviews: reviews || [],
        loading,
        error
    }

}

export default useReviews;