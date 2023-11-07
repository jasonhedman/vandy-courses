import {addDoc, collection, doc, increment, updateDoc} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {ReviewInput} from "@/types/Review";
import {updateCourseNumReviews} from "@/services/courses";
import {REVIEWS_COLLECTION, REPORTS_COLLECTION} from "@/firebase/firestore/collections";

// adds a review to the database
export const addReview = async (reviewInput: ReviewInput) => {
    const doc = await addDoc(collection(firestore, REVIEWS_COLLECTION), {
        ...reviewInput,
        createdAt: new Date(),
        score: 0,
        numReports: 0,
    })
    await updateDoc(doc, {
        id: doc.id,
    })
    await updateCourseNumReviews(reviewInput.courseId, 1);
}

// upvotes or downvotes a review
export const voteReview = async (reviewId: string, amountIncrement: number) => {
    return updateDoc(doc(firestore, REVIEWS_COLLECTION, reviewId), {
        score: increment(amountIncrement),
    });
}

// increments report count
export const updateReviewNumReports = async (id: string, amountIncrement: number) => {
    return updateDoc(doc(firestore, REVIEWS_COLLECTION, id), {
        numReports: increment(amountIncrement)
    });
}