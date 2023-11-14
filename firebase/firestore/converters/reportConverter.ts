import {
    collection,
    doc,
    DocumentData,
    FirestoreDataConverter,
    QueryDocumentSnapshot,
    SnapshotOptions,
    WithFieldValue
} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {REPORTS_COLLECTION, REVIEWS_COLLECTION} from "@/firebase/firestore/collections";

import {Report} from "@/types/Report";

// converts a review document to a Review object, allowing for typed queries and strict type checking
const reportConverter: FirestoreDataConverter<Report> = {
    toFirestore(report: WithFieldValue<Report>): DocumentData {
        return {
            id: report.id,
            reviewId: report.reviewId,
            userId: report.userId,
            type: report.type,
            description: report.description,
        };
    },
    fromFirestore(
        snapshot: QueryDocumentSnapshot,
        options: SnapshotOptions
    ): Report {
        const data = snapshot.data(options);
        return {
            id: data.id,
            reviewId: data.reviewId,
            userId: data.userId,
            type: data.type,
            description: data.description,
        };
    },
};

// collection reference for querying reviews
export const reportsCollection = (reviewId: string) =>
    collection(firestore, REVIEWS_COLLECTION, reviewId, REPORTS_COLLECTION).withConverter(reportConverter);

export const reportDocument = (reviewId: string, reportId: string) =>
    doc(firestore, REVIEWS_COLLECTION, reviewId, REPORTS_COLLECTION, reportId).withConverter(reportConverter);