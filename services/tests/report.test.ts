import { jest, describe, it, expect } from "@jest/globals";

import {addDoc, DocumentReference, updateDoc} from "@firebase/firestore";

import { addReport } from "@/services/reports";
import { ReportInput, ReportType } from "@/types/Report";
import { updateReviewNumReports } from "@/services/reviews";

jest.mock("@firebase/firestore", () => ({
    addDoc: jest.fn(),
    collection: jest.fn(),
    doc: jest.fn(),
    updateDoc: jest.fn(),
}));

jest.mock("@/services/reviews", () => ({
    updateReviewNumReports: jest.fn(),
}));

jest.mock("@/firebase/firestore", () => ({}));

describe('Report Services', () => {
    const mockReportInput: ReportInput = {
        reviewId: 'review1',
        userId: 'user1',
        type: ReportType.INAPPROPRIATE,
        description: 'This review is inappropriate',
    };

    const mockReportId = 'report1';

    describe('addReport', () => {
        it('adds a report and updates the ID successfully', async () => {
            const mockDocRef: DocumentReference = {
                id: mockReportId,
            } as DocumentReference;

            (addDoc as jest.MockedFunction<typeof addDoc>).mockResolvedValueOnce(mockDocRef);
            (updateDoc as jest.MockedFunction<typeof updateDoc>).mockResolvedValueOnce(undefined);
            (updateReviewNumReports as jest.MockedFunction<typeof updateReviewNumReports>).mockResolvedValueOnce(true);

            const result = await addReport(mockReportInput);

            expect(result).toBe(true);
            expect(addDoc).toHaveBeenCalled();
            expect(updateDoc).toHaveBeenCalledWith(mockDocRef, { id: mockReportId });
            expect(updateReviewNumReports).toHaveBeenCalledWith('review1', 1);
        });

        it('handles errors when adding a report', async () => {
            (addDoc as jest.MockedFunction<typeof addDoc>).mockRejectedValueOnce(new Error('Failed to add document'));

            const result = await addReport(mockReportInput);

            expect(result).toBe(false);
        });

        // Additional test case for handling errors in updateDoc
        it('handles errors when updating the report ID', async () => {
            const mockDocRef: DocumentReference = {
                id: mockReportId,
            } as DocumentReference;

            (addDoc as jest.MockedFunction<typeof addDoc>).mockResolvedValueOnce(mockDocRef);
            (updateDoc as jest.MockedFunction<typeof updateDoc>).mockRejectedValueOnce(new Error('Failed to update document'));

            const result = await addReport(mockReportInput);

            expect(result).toBe(false);
        });

        // Additional test case for handling errors in updateReviewNumReports
        it('handles errors when incrementing review numReports', async () => {
            const mockDocRef: DocumentReference = {
                id: mockReportId,
            } as DocumentReference;

            (addDoc as jest.MockedFunction<typeof addDoc>).mockResolvedValueOnce(mockDocRef);
            (updateDoc as jest.MockedFunction<typeof updateDoc>).mockResolvedValueOnce(undefined);
            (updateReviewNumReports as jest.MockedFunction<typeof updateReviewNumReports>).mockRejectedValueOnce(new Error('Failed to increment numReports'));

            const result = await addReport(mockReportInput);

            expect(result).toBe(false);
        });
    });
});
