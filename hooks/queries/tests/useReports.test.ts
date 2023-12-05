import { beforeEach, describe, it, expect, jest } from "@jest/globals";
import { renderHook } from '@testing-library/react';
import useReports from "@/hooks/queries/useReports"; // Update the path as necessary
import { useCollectionData } from "react-firebase-hooks/firestore";

jest.mock("@firebase/firestore", () => ({
    query: jest.fn()
}));

jest.mock("react-firebase-hooks/firestore", () => ({
    useCollectionData: jest.fn()
}));

// Mock the reportsCollection
jest.mock("@/firebase/firestore/converters/reportConverter", () => ({
    reportsCollection: jest.fn()
}));

describe("useReports Hook", () => {
    const mockReviewId = "review123";
    const mockReports = [
        { id: "report1", content: "Report content 1" },
        { id: "report2", content: "Report content 2" },
        { id: undefined, content: "Invalid report" }
    ];

    beforeEach(() => {
        (useCollectionData as jest.Mock) = jest.fn(() => [mockReports, false, null]);
        (require("@/firebase/firestore/converters/reportConverter").reportsCollection as jest.Mock) = jest.fn(() => ({}));
    });

    it("fetches report data correctly", () => {
        const { result } = renderHook(() => useReports(mockReviewId));

        // Should filter out the report with undefined id
        expect(result.current.reports).toEqual(mockReports.filter(report => report.id !== undefined));
        expect(result.current.loading).toBeFalsy();
        expect(result.current.error).toBeNull();
    });

    it("calls reportsCollection with correct reviewId", () => {
        renderHook(() => useReports(mockReviewId));

        expect(require("@/firebase/firestore/converters/reportConverter").reportsCollection).toHaveBeenCalledWith(mockReviewId);
    });

    it("handles undefined reports data by defaulting to an empty array", () => {
        (useCollectionData as jest.Mock).mockReturnValue([undefined, false, null]);

        const { result } = renderHook(() => useReports(mockReviewId));

        expect(result.current.reports).toEqual([]);
    });
});
