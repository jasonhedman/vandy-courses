import {addDoc, collection, deleteDoc, doc, getDocs, increment, query, updateDoc} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {ReviewInput} from "@/types/Review";
import {updateCourseNumReviews} from "@/services/courses";
import {COMMENTS_COLLECTION, REVIEWS_COLLECTION, VOTES_COLLECTION} from "@/firebase/firestore/collections";

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

const deleteSubcollection = async (reviewId: string, subcollectionName: string) => {
    const subcollectionRef = collection(firestore, REVIEWS_COLLECTION, reviewId, subcollectionName);
    const subcollectionSnapshot = await getDocs(query(subcollectionRef));

    // Delete each document in the subcollection.
    for (const doc of subcollectionSnapshot.docs) {
        await deleteDoc(doc.ref);
    }
};

export const deleteReview = async (reviewId: string) => {
    // Delete all comments associated with the review.
    await deleteSubcollection(reviewId, COMMENTS_COLLECTION);

    // Delete all votes associated with the review.
    await deleteSubcollection(reviewId, VOTES_COLLECTION);

    // Delete the review itself.
    const reviewRef = doc(firestore, REVIEWS_COLLECTION, reviewId);
    await deleteDoc(reviewRef);
};