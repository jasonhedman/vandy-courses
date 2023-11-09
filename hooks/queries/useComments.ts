import {orderBy, query} from "@firebase/firestore";

import {useCollectionData} from "react-firebase-hooks/firestore";

import commentsCollection from "@/firebase/firestore/converters/commentConverter";


// custom hook to get all comments for a review
const useComments = (reviewId: string) => {

    // get all comments for a review, ordered by score
    const [comments, loading, error] = useCollectionData(query(
        commentsCollection(reviewId),
        orderBy('score', 'desc')
    ));

    return {
        // filter out any comments with undefined IDs (which must be added to the record after creation)
        comments: comments ? comments.filter(comment => comment.id !== undefined) : [],
        loading,
        error,
    }
}

export default useComments;