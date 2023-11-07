import {addDoc, collection, doc, increment, updateDoc} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {COMMENTS_COLLECTION, REVIEWS_COLLECTION} from "@/firebase/firestore/collections";

import {CommentInput} from "@/types/Comment";

// adds a comment document to a review's comments subcollection
export const addComment = async (commentInput: CommentInput) => {
    // create the document with the input data
    const doc = await addDoc(collection(firestore, REVIEWS_COLLECTION, commentInput.reviewId, COMMENTS_COLLECTION), {
        ...commentInput,
        createdAt: new Date(),
        score: 0,
    })
    // update the document with the ID
    await updateDoc(doc, {
        id: doc.id,
    })
}

// increments a comment's score by a given amount
export const voteComment = async (reviewId: string, commentId: string, amountIncrement: number) => {
    return updateDoc(doc(firestore, REVIEWS_COLLECTION, reviewId, COMMENTS_COLLECTION, commentId), {
        score: increment(amountIncrement),
    });
}