import {addDoc, collection, doc, updateDoc} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {REVIEWS_COLLECTION, VOTES_COLLECTION} from "@/firebase/firestore/collections";

import {VoteInput, VoteStatus} from "@/types/Vote";

// adds a vote document to a review's votes subcollection
export const addReviewVote = async (reviewId: string, vote: VoteInput) => {
    // create the document with the input data
    const doc = await addDoc(collection(firestore, REVIEWS_COLLECTION, reviewId, VOTES_COLLECTION), vote)
    // update the document with the ID
    await updateDoc(doc, {
        id: doc.id,
    });
}

// updates the vote status of a vote doucment that is stored in a review's votes subcollection
export const updateReviewVote = async (reviewId: string, voteId: string, voteStatus: VoteStatus) => {
    return updateDoc(doc(firestore, REVIEWS_COLLECTION, reviewId, VOTES_COLLECTION, voteId), {
        voteStatus,
    });
}

