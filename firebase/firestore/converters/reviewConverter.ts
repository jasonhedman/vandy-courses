import {
    collection, doc,
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue
} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {Review} from "@/types/Review";
import {Professor} from "@/types/Professor";
import {REVIEWS_COLLECTION} from "@/firebase/firestore/collections";
import moment from "moment";

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
            createdAt: moment.unix(data.createdAt.seconds)
        };
    },
};

export const reviewsCollection = collection(firestore, REVIEWS_COLLECTION).withConverter(reviewConverter);

export const reviewDocument = (reviewId: string) => doc(firestore, REVIEWS_COLLECTION, reviewId).withConverter(reviewConverter);