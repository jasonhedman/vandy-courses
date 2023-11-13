import {addDoc, collection, updateDoc} from "@firebase/firestore";

import firestore from "@/firebase/firestore";
import {REPORTS_COLLECTION, REVIEWS_COLLECTION} from "@/firebase/firestore/collections";

import { updateReviewNumReports } from "@/services/reviews";

import { ReportInput } from "@/types/Report";

// adds a report to a specific review doc
export const addReport = async (reportInput: ReportInput): Promise<boolean> => {
    try {
        // create the document with the input data
        const doc = await addDoc(collection(firestore, REVIEWS_COLLECTION, reportInput.reviewId, REPORTS_COLLECTION), {
            ...reportInput,
        })
        // update the document with the ID
        await updateDoc(doc, {
            id: doc.id,
        })
        // increment the review's numReports by 1
        await updateReviewNumReports(reportInput.reviewId, 1);
        return true
    } catch {
        return false
    }
}
