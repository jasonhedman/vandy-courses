import {
    collection,
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue
} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {Vote} from "@/types/Vote";

const voteConverter: FirestoreDataConverter<Vote> = {
    toFirestore(review: WithFieldValue<Vote>): DocumentData {
        return {
            id: review.id,
            reviewId: review.reviewId,
            userId: review.userId,
            voteStatus: review.voteStatus
        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): Vote {
        const data = snapshot.data(options);
        return {
            id: data.id,
            reviewId: data.reviewId,
            userId: data.userId,
            voteStatus: data.voteStatus
        };
    },
};

const votesCollection = collection(firestore, 'votes').withConverter(voteConverter);

export default votesCollection;