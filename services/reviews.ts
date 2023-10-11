import {addDoc, collection, doc, increment, updateDoc} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {ReviewInput} from "@/types/Review";
import {updateCourseNumReviews} from "@/services/courses";

// adds a review to the database
export const addReview = async (reviewInput: ReviewInput) => {
    const doc = await addDoc(collection(firestore, "reviews"), {
        ...reviewInput,
        createdAt: new Date(),
        score: 0,
    })
    await updateDoc(doc, {
        id: doc.id,
    })
    await updateCourseNumReviews(reviewInput.courseId, true);
}

// upvotes or downvotes a review
export const voteReview = async (reviewId: string, isUpvote: boolean) => {
    return updateDoc(doc(firestore, "reviews", reviewId), {
        score: increment(isUpvote ? 1 : -1),
    });
}