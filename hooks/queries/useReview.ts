import {useDocumentData} from "react-firebase-hooks/firestore";

import {reviewDocument} from "@/firebase/firestore/converters/reviewConverter";

const useReview = (reviewId: string) => {
    const [review, loading, error] = useDocumentData(reviewDocument(reviewId));

    return {
        review,
        loading,
        error,
    }
}

export default useReview;