import {
    collection, 
    doc, 
    getDocs,
    deleteDoc,
    query
} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {REVIEWS_COLLECTION, COMMENTS_COLLECTION, VOTES_COLLECTION} from "@/firebase/firestore/collections";

// Utility function to delete all documents in a subcollection.
const deleteSubcollection = async (reviewId: string, subcollectionName: string) => {
    const subcollectionRef = collection(firestore, REVIEWS_COLLECTION, reviewId, subcollectionName);
    const subcollectionSnapshot = await getDocs(query(subcollectionRef));

    // Delete each document in the subcollection.
    for (const doc of subcollectionSnapshot.docs) {
        await deleteDoc(doc.ref);
    }
};

const deleteReview = async (reviewId: string) => {
    // Delete all comments associated with the review.
    await deleteSubcollection(reviewId, COMMENTS_COLLECTION);

    // Delete all votes associated with the review.
    await deleteSubcollection(reviewId, VOTES_COLLECTION);

    // Delete the review itself.
    const reviewRef = doc(firestore, REVIEWS_COLLECTION, reviewId);
    await deleteDoc(reviewRef);
};

export { deleteReview };


// const deleteReview = async (reviewId: string) => {
//   const reviewRef = doc(firestore, "reviews", reviewId); // Using "reviews" as the collection name
//   await deleteDoc(reviewRef);
// };

// export { deleteReview };

