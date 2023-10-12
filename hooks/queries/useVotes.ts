import {query, where} from "@firebase/firestore";

import {useCollectionData} from "react-firebase-hooks/firestore";

import votesCollection from "@/firebase/firestore/converters/voteConverter";

const useVotes = (userId: string, reviewId: string) => {

    const [votes, loading, error] = useCollectionData(query(votesCollection,
        where('userId', '==', userId),
        where('reviewId', '==', reviewId)
    ));

    return {
        votes,
        loading,
        error,
    }
}

export default useVotes;