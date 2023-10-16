import {addDoc, collection, doc, increment, updateDoc} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {CommentInput} from "@/types/Comment";

// adds a review to the database
export const addComment = async (commentInput: CommentInput) => {
    const doc = await addDoc(collection(firestore, "reviews", commentInput.reviewId, "comments"), {
        ...commentInput,
        createdAt: new Date(),
        score: 0,
    })
    await updateDoc(doc, {
        id: doc.id,
    })
}

// upvotes or downvotes a review
export const voteComment = async (reviewId: string, commentId: string, amountIncrement: number) => {
    return updateDoc(doc(firestore, "reviews", reviewId, "comments", commentId), {
        score: increment(amountIncrement),
    });
}