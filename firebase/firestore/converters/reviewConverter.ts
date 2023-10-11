import {
    collection,
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue
} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {Review} from "@/types/Review";

const reviewConverter: FirestoreDataConverter<Review> = {
    toFirestore(review: WithFieldValue<Review>): DocumentData {
        return {
            id: review.id,
            courseId: review.courseId,
            professorId: review.professorId,
            userId: review.userId,
            title: review.title,
            content: review.content,
            rating: review.rating,
            difficulty: review.difficulty,
            score: review.score
        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): Review {
        const data = snapshot.data(options);
        return {
            id: data.id,
            courseId: data.courseId,
            professorId: data.professorId,
            userId: data.userId,
            title: data.title,
            content: data.content,
            rating: data.rating,
            difficulty: data.difficulty,
            score: data.score
        };
    },
};

const reviewsCollection = collection(firestore, 'reviews').withConverter(reviewConverter);

export default reviewsCollection;