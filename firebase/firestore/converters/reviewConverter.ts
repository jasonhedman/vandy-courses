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
import {Professor} from "@/types/Professor";

const reviewConverter: FirestoreDataConverter<Review> = {
    toFirestore(review: WithFieldValue<Review>): DocumentData {
        return {
            id: review.id,
            courseId: review.courseId,
            professor: {
                id: (review.professor as Professor).id,
                name: (review.professor as Professor).name,
            },
            userId: review.userId,
            title: review.title,
            content: review.content,
            rating: review.rating,
            difficulty: review.difficulty,
            skippability: review.skippability,
            takeHomeExams: review.takeHomeExams,
            sleepScore: review.sleepScore,
            effortForA: review.effortForA,
            chatGptability: review.chatGptability,
            profChillScore: review.profChillScore,
            score: review.score,
            createdAt: review.createdAt
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
            professor: {
                id: data.professor.id,
                name: data.professor.name,
            },
            userId: data.userId,
            title: data.title,
            content: data.content,
            rating: data.rating,
            difficulty: data.difficulty,
            skippability: data.skippability,
            takeHomeExams: data.takeHomeExams,
            sleepScore: data.sleepScore,
            effortForA: data.effortForA,
            chatGptability: data.chatGptability,
            profChillScore: data.profChillScore,
            score: data.score,
            createdAt: data.createdAt.toDate()
        };
    },
};

const reviewsCollection = collection(firestore, 'reviews').withConverter(reviewConverter);

export default reviewsCollection;