import {addDoc, collection, doc, updateDoc} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {VoteInput, VoteStatus} from "@/types/Vote";
import {COMMENTS_COLLECTION, REVIEWS_COLLECTION, VOTES_COLLECTION} from "@/firebase/firestore/collections";

// adds a vote document to a comment's votes subcollection
export const addCommentVote = async (reviewId: string, commentId: string, vote: VoteInput): Promise<boolean> => {
    try {
        // create the document with the input data
        const doc = await addDoc(collection(firestore, REVIEWS_COLLECTION, reviewId, COMMENTS_COLLECTION, commentId, VOTES_COLLECTION), vote)
        // update the document with the ID
        await updateDoc(doc, {
            id: doc.id,
        });
        return true
    } catch (e) {
        return false
    }
}

// updates the vote status of a vote doucment that is stored in a comment's votes subcollection
export const updateCommentVote = async (
    reviewId: string,
    commentId: string,
    voteId: string,
    voteStatus: VoteStatus
): Promise<boolean> =>
    updateDoc(doc(firestore, REVIEWS_COLLECTION, reviewId, COMMENTS_COLLECTION, commentId, VOTES_COLLECTION, voteId), {
        voteStatus,
    })
        .then(() => true)
        .catch(() => false);

