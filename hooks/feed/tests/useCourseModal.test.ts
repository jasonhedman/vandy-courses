import { jest, describe, it, beforeEach, expect } from "@jest/globals";
import { act, renderHook } from '@testing-library/react';
import useCourseModal from "@/hooks/feed/useCourseModal"; // Update the path as necessary
import { useDisclosure } from "@chakra-ui/react";
import { Course } from "@/types/Course";

jest.mock("@chakra-ui/react", () => ({
    useDisclosure: jest.fn()
}));

describe("useCourseModal Hook", () => {
    const mockCourse: Course = {
        id: "course1",
        name: "Course 1",
        description: "This is a course",
        numReviews: 0,
    };

    let isOpen = false;
    const onOpen = jest.fn(() => (isOpen = true));
    const onClose = jest.fn(() => (isOpen = false));

    beforeEach(() => {
        (useDisclosure as jest.MockedFunction<typeof useDisclosure>).mockImplementation(() => ({
            isOpen: (() => isOpen)(),
            onOpen,
            onClose,
            onToggle: jest.fn(),
            isControlled: false,
            getButtonProps: jest.fn(),
            getDisclosureProps: jest.fn()
        }));
    });

    it("should handle opening and setting the course", () => {
        const { result } = renderHook(() => useCourseModal());

        act(() => {
            result.current.openCourseModal(mockCourse);
        });

        expect(onOpen).toHaveBeenCalled();
        expect(result.current.isOpen).toBe(true);
        expect(result.current.course).toEqual(mockCourse);
    });

    it("should handle closing the modal", () => {
        const { result } = renderHook(() => useCourseModal());

        // Open the modal first
        act(() => {
            result.current.openCourseModal(mockCourse);
        });

        // Then close it
        act(() => {
            result.current.onClose();
        });

        expect(onClose).toHaveBeenCalled();
        expect(result.current.isOpen).toBe(true);
    });
});

