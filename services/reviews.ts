import {addDoc, collection, deleteDoc, doc, increment, updateDoc} from "@firebase/firestore";

import firestore from "@/firebase/firestore";
import {COMMENTS_COLLECTION, REVIEWS_COLLECTION, VOTES_COLLECTION} from "@/firebase/firestore/collections";

import {updateCourseNumReviews} from "@/services/courses";
import {deleteSubcollection} from "@/services/firebaseUtils";

import {ReviewInput} from "@/types/Review";
import {REVIEWS_COLLECTION, REPORTS_COLLECTION} from "@/firebase/firestore/collections";

// adds a review to the database
export const addReview = async (reviewInput: ReviewInput): Promise<boolean> => {
    try {
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
        return true
    } catch {
        return false
    }
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

// increments a review's score by a given amount
export const voteReview = async (reviewId: string, amountIncrement: number): Promise<boolean> =>
    updateDoc(doc(firestore, REVIEWS_COLLECTION, reviewId), {
        score: increment(amountIncrement),
    })
        .then(() => true)
        .catch(() => false)

export const deleteReview = async (reviewId: string): Promise<boolean> => {
    try {
        // Delete all comments and votes associated with the review.
        await Promise.all([
            deleteSubcollection(REVIEWS_COLLECTION, reviewId, COMMENTS_COLLECTION),
            deleteSubcollection(REVIEWS_COLLECTION, reviewId, VOTES_COLLECTION)
        ])
        // Delete the review.
        await deleteDoc(doc(firestore, REVIEWS_COLLECTION, reviewId));
        return true;
    } catch {
        return false;
    }
};
    });
}

// increments report count
export const updateReviewNumReports = async (id: string, amountIncrement: number) => {
    return updateDoc(doc(firestore, REVIEWS_COLLECTION, id), {
        numReports: increment(amountIncrement)
    });
}