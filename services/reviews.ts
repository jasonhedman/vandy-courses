import {addDoc, collection, doc, increment, updateDoc} from "@firebase/firestore";

import db from "@/firebase/db";

import {ReviewInput} from "@/types/Review";



// adds a review to the database
export const addReview = async (reviewInput: ReviewInput) => {
    return addDoc(collection(db, "reviews"), {
        ...reviewInput,
        score: 0,
    })
        .then((docRef) => {
            updateDoc(docRef, {
                id: docRef.id,
            })
        });
}

// upvotes or downvotes a review
export const voteReview = async (reviewId: string, isUpvote: boolean) => {
    return updateDoc(doc(db, "reviews", reviewId), {
        score: increment(isUpvote ? 1 : -1),
    });
}