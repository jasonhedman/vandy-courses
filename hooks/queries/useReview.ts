import {useDocumentData} from "react-firebase-hooks/firestore";

import {reviewDocument} from "@/firebase/firestore/converters/reviewConverter";

// custom hook to get a review
const useReview = (reviewId: string) => {

    // get the review data and update in real time
    const [review, loading, error] = useDocumentData(reviewDocument(reviewId));

    return {
        review,
        loading,
        error,
    }
}

export default useReview;