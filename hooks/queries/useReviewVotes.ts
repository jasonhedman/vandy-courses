import {query, where} from "@firebase/firestore";

import {useCollectionData} from "react-firebase-hooks/firestore";

import {reviewVotesCollection} from "@/firebase/firestore/converters/voteConverter";

const useReviewVotes = (userId: string, reviewId: string) => {

    const [votes, loading, error] = useCollectionData(query(reviewVotesCollection(reviewId),
        where('userId', '==', userId),
    ));

    return {
        votes,
        loading,
        error,
    }
}

export default useReviewVotes;