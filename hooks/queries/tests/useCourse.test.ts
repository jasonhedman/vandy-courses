import { beforeEach, describe, it, expect, jest } from "@jest/globals";
import { renderHook } from '@testing-library/react';
import useCourse from "@/hooks/queries/useCourse"; // Update the path as necessary
import { useDocumentData } from "react-firebase-hooks/firestore";

jest.mock("react-firebase-hooks/firestore", () => ({
    useDocumentData: jest.fn()
}));

// Mock the courseDocument function
jest.mock("@/firebase/firestore/converters/courseConverter", () => ({
    courseDocument: jest.fn()
}));

describe("useCourse Hook", () => {
    const mockCourseId = "course123";
    const mockCourse = { id: mockCourseId, title: "Interesting Course" };

    beforeEach(() => {
        (useDocumentData as jest.Mock) = jest.fn(() => [mockCourse, false, null]);
        (require("@/firebase/firestore/converters/courseConverter").courseDocument as jest.Mock) = jest.fn(() => ({}));
    });

    it("fetches course data correctly", () => {
        const { result } = renderHook(() => useCourse(mockCourseId));

        expect(result.current.course).toEqual(mockCourse);
        expect(result.current.loading).toBeFalsy();
        expect(result.current.error).toBeNull();
    });

    it("calls courseDocument with correct courseId", () => {
        renderHook(() => useCourse(mockCourseId));

        expect(require("@/firebase/firestore/converters/courseConverter").courseDocument).toHaveBeenCalledWith(mockCourseId);
    });
});
