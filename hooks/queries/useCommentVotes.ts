import {query, where} from "@firebase/firestore";

import {useCollectionData} from "react-firebase-hooks/firestore";

import {commentVotesCollection} from "@/firebase/firestore/converters/voteConverter";

// custom hook to get all votes for a comment
const useCommentVotes = (userId: string, reviewId: string, commentId: string) => {

    // get all votes for a comment on a review by a user
    const [votes, loading, error] = useCollectionData(query(commentVotesCollection(reviewId, commentId),
        where('userId', '==', userId),
    ));

    return {
        votes,
        loading,
        error,
    }
}

export default useCommentVotes;