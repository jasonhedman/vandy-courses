import {
    collection,
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue
} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {Comment} from "@/types/Comment";
import {COMMENTS_COLLECTION, REVIEWS_COLLECTION} from "@/firebase/firestore/collections";

const commentConverter: FirestoreDataConverter<Comment> = {
    toFirestore(review: WithFieldValue<Comment>): DocumentData {
        return {
            id: review.id,
            reviewId: review.reviewId,
            userId: review.userId,
            content: review.content,
            score: review.score,
        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): Comment {
        const data = snapshot.data(options);
        return {
            id: data.id,
            reviewId: data.reviewId,
            userId: data.userId,
            content: data.content,
            score: data.score,
            createdAt: data.createdAt.toDate(),
        };
    },
};

const commentsCollection = (reviewId: string) => collection(firestore, REVIEWS_COLLECTION, reviewId, COMMENTS_COLLECTION)
    .withConverter(commentConverter);

export default commentsCollection;