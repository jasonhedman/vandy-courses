import {addDoc, collection, doc, updateDoc} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {REVIEWS_COLLECTION, VOTES_COLLECTION} from "@/firebase/firestore/collections";

import {VoteInput, VoteStatus} from "@/types/Vote";

export const addReviewVote = async (reviewId: string, vote: VoteInput) => {
    const doc = await addDoc(collection(firestore, REVIEWS_COLLECTION, reviewId, VOTES_COLLECTION), vote)
    await updateDoc(doc, {
        id: doc.id,
    });
}

export const updateReviewVote = async (reviewId: string, voteId: string, voteStatus: VoteStatus) => {
    return updateDoc(doc(firestore, REVIEWS_COLLECTION, reviewId, VOTES_COLLECTION, voteId), {
        voteStatus,
    });
}

