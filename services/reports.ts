import {addDoc, collection, doc, increment, updateDoc} from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import {updateCourseNumReviews} from "@/services/courses";
import {REPORTS_COLLECTION, REVIEWS_COLLECTION} from "@/firebase/firestore/collections";
import {Report, ReportInput} from "@/types/Report";
import { updateReviewNumReports } from "./reviews";

// adds a report to a specific review doc
export const addReport = async (reportInput: ReportInput) => {
    const doc = await addDoc(collection(firestore, REVIEWS_COLLECTION, reportInput.reviewId, REPORTS_COLLECTION), {
        ...reportInput,
    });
    await updateDoc(doc, {
        id: doc.id,
    })
    await updateReviewNumReports(reportInput.reviewId, 1);
}
