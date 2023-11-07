import {addDoc, collection, doc, increment, updateDoc} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {ReviewInput} from "@/types/Review";
import {updateCourseNumReviews} from "@/services/courses";
import {REVIEWS_COLLECTION} from "@/firebase/firestore/collections";

// adds a review to the database
export const addReview = async (reviewInput: ReviewInput) => {
    // create the document with the input data
    const doc = await addDoc(collection(firestore, REVIEWS_COLLECTION), {
        ...reviewInput,
        createdAt: new Date(),
        score: 0,
    })
    // update the document with the ID
    await updateDoc(doc, {
        id: doc.id,
    })
    // increment the course's numReviews by 1
    await updateCourseNumReviews(reviewInput.courseId, 1);
}

// increments a review's score by a given amount
export const voteReview = async (reviewId: string, amountIncrement: number) => {
    return updateDoc(doc(firestore, REVIEWS_COLLECTION, reviewId), {
        score: increment(amountIncrement),
    });
}