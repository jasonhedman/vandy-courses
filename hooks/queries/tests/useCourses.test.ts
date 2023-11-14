import { beforeEach, describe, it, expect, jest } from "@jest/globals";
import { renderHook } from '@testing-library/react';
import useCourses from "@/hooks/queries/useCourses"; // Update the path as necessary
import { useCollectionDataOnce } from "react-firebase-hooks/firestore";
import { orderBy, query } from "@firebase/firestore";

jest.mock("@firebase/firestore", () => ({
    orderBy: jest.fn(),
    query: jest.fn()
}));

jest.mock("react-firebase-hooks/firestore", () => ({
    useCollectionDataOnce: jest.fn()
}));

// Mock the coursesCollection
jest.mock("@/firebase/firestore/converters/courseConverter", () => ({
    coursesCollection: {}
}));

describe("useCourses Hook", () => {
    const mockCourses = [
        { id: "course1", name: "Course 1", numReviews: 100 },
        { id: "course2", name: "Course 2", numReviews: 50 }
    ];

    beforeEach(() => {
        (useCollectionDataOnce as jest.Mock).mockReturnValue([mockCourses, false, null]);
    });

    it("fetches courses data correctly", () => {
        const { result } = renderHook(() => useCourses());

        expect(result.current.courses).toEqual(mockCourses);
        expect(result.current.loading).toBeFalsy();
        expect(result.current.error).toBeNull();
    });

    it("handles undefined courses data by defaulting to an empty array", () => {
        (useCollectionDataOnce as jest.Mock).mockReturnValue([undefined, false, null]);

        const { result } = renderHook(() => useCourses());

        expect(result.current.courses).toEqual([]);
    });

    it("constructs query with orderBy correctly", () => {
        renderHook(() => useCourses());

        expect(query).toHaveBeenCalled();
        expect(orderBy).toHaveBeenCalledWith('numReviews', 'desc');
    });
});
