import { jest, describe, it, expect } from "@jest/globals";

import { doc, setDoc, updateDoc, increment } from '@firebase/firestore';

import firestore from '@/firebase/firestore';

import { setCourse, updateCourseNumReviews } from '@/services/courses';

import {Course} from "@/types/Course";

// write jest unit tests for setCourse and updateCourseNumReviews
jest.mock("@firebase/firestore", () => ({
    doc: jest.fn(),
    setDoc: jest.fn(),
    updateDoc: jest.fn(),
    increment: jest.fn(),
}));

jest.mock("@/firebase/firestore", () => ({}));

describe('Courses Services', () => {
  const mockCourse: Course = {
    id: 'course1',
    name: 'Test Course',
    description: 'Test Course Description',
    numReviews: 0,
  };

  describe('setCourse', () => {
    it('successfully sets a course', async () => {
      (setDoc as jest.MockedFunction<typeof setDoc>).mockResolvedValueOnce(undefined);

      const result = await setCourse(mockCourse);

      expect(setDoc).toHaveBeenCalledWith(doc(firestore, 'courses', mockCourse.id), {...mockCourse});
      expect(result).toBe(true);
    });

    it('handles setDoc error', async () => {
      const mockError = new Error('Failed to set document');
      (setDoc as jest.MockedFunction<typeof setDoc>).mockRejectedValueOnce(mockError);

      const result = await setCourse(mockCourse);

      expect(result).toBe(false);
    });
  });

  describe('updateCourseNumReviews', () => {
    it('successfully updates numReviews', async () => {
      (updateDoc as jest.MockedFunction<typeof updateDoc>).mockResolvedValueOnce(undefined);

      const courseId = 'course1';
      const amountIncrement = 5;
      const result = await updateCourseNumReviews(courseId, amountIncrement);

      expect(updateDoc).toHaveBeenCalledWith(doc(firestore, 'courses', courseId), { numReviews: increment(amountIncrement) });
      expect(result).toBe(true);
    });

    it('handles updateDoc error', async () => {
      const mockError = new Error('Failed to update document');
      (updateDoc as jest.MockedFunction<typeof updateDoc>).mockRejectedValueOnce(mockError);

      const result = await updateCourseNumReviews('course1', 5);

      expect(result).toBe(false);
    });
  });
});
