import {query, where} from "@firebase/firestore";

import {useCollectionData} from "react-firebase-hooks/firestore";

import {reviewVotesCollection} from "@/firebase/firestore/converters/voteConverter";

// custom hook to get all votes for a review
const useReviewVotes = (userId: string, reviewId: string) => {

    // get all votes for a review by a user
    const [votes, loading, error] = useCollectionData(query(reviewVotesCollection(reviewId),
        where('userId', '==', userId),
    ));

    return {
        votes: votes || [],
        loading,
        error,
    }
}

export default useReviewVotes;