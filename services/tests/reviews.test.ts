import { jest, describe, it, expect } from "@jest/globals";

import { addDoc, deleteDoc, doc, increment, updateDoc, DocumentReference } from "@firebase/firestore";

import firestore from "@/firebase/firestore";

import { addReview, voteReview, deleteReview, updateReviewNumReports } from "@/services/reviews";
import { updateCourseNumReviews } from "@/services/courses";
import { deleteSubcollection } from "@/services/firebaseUtils";
import {ReviewInput} from "@/types/Review";

jest.mock("@firebase/firestore", () => ({
  addDoc: jest.fn(),
  collection: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn(),
  increment: jest.fn(),
  updateDoc: jest.fn(),
}));

jest.mock("@/firebase/firestore", () => ({}));

jest.mock("@/services/courses", () => ({
  updateCourseNumReviews: jest.fn(),
}));

jest.mock("@/services/firebaseUtils", () => ({
  deleteSubcollection: jest.fn(),
}));

describe('Review Services', () => {
  const reviewId = 'review1';
  const mockReviewInput: ReviewInput = {
    courseId: 'course1',
    content: 'Great course!',
    userId: 'user1',
    title: 'Great course!',
    rating: 5,
    difficulty: 5,
    skippability: 5,
    takeHomeExams: true,
    sleepScore: 5,
    effortForA: 5,
    chatGptability: 5,
    profChillScore: 5,
    professor: {
      id: 'prof1',
      name: 'Professor 1',
    }
  };

  // Mock DocumentReference
  const mockDocRef: DocumentReference = {
    id: reviewId,
  } as DocumentReference;

  describe('addReview', () => {
    it('adds a review, updates the ID, and increments numReviews', async () => {
      (addDoc as jest.MockedFunction<typeof addDoc>).mockResolvedValueOnce(mockDocRef);
      (updateDoc as jest.MockedFunction<typeof updateDoc>).mockResolvedValueOnce(undefined);
      (updateCourseNumReviews as jest.MockedFunction<typeof updateCourseNumReviews>).mockResolvedValueOnce(true);

      const result = await addReview(mockReviewInput);

      expect(result).toBe(true);
      expect(addDoc).toHaveBeenCalled();
      expect(updateDoc).toHaveBeenCalledWith(mockDocRef, { id: reviewId });
      expect(updateCourseNumReviews).toHaveBeenCalledWith(mockReviewInput.courseId, 1);
    });

    it('returns false when addDoc fails', async () => {
      (addDoc as jest.MockedFunction<typeof addDoc>).mockRejectedValueOnce(new Error('Failed to add document'));

      const result = await addReview(mockReviewInput);

      expect(result).toBe(false);
    });

    it('returns false when updateDoc fails', async () => {
      (addDoc as jest.MockedFunction<typeof addDoc>).mockResolvedValueOnce(mockDocRef);
      (updateDoc as jest.MockedFunction<typeof updateDoc>).mockRejectedValueOnce(new Error('Failed to update document'));

      const result = await addReview(mockReviewInput);

      expect(result).toBe(false);
    });

    it('returns false when updateCourseNumReviews fails', async () => {
      (addDoc as jest.MockedFunction<typeof addDoc>).mockResolvedValueOnce(mockDocRef);
      (updateDoc as jest.MockedFunction<typeof updateDoc>).mockResolvedValueOnce(undefined);
      (updateCourseNumReviews as jest.MockedFunction<typeof updateCourseNumReviews>).mockRejectedValueOnce(new Error('Failed to update course numReviews'));

      const result = await addReview(mockReviewInput);

      expect(result).toBe(false);
    });
  });

  describe('voteReview', () => {
    it('successfully updates the score of a review', async () => {
      (updateDoc as jest.MockedFunction<typeof updateDoc>).mockResolvedValueOnce(undefined);

      const result = await voteReview(reviewId, 1);

      expect(result).toBe(true);
      expect(updateDoc).toHaveBeenCalledWith(doc(firestore, 'reviews', reviewId), {
        score: increment(1),
      });
    });

    it('returns false when updateDoc fails', async () => {
      (updateDoc as jest.MockedFunction<typeof updateDoc>).mockRejectedValueOnce(new Error('Failed to update document'));

      const result = await voteReview(reviewId, 1);

      expect(result).toBe(false);
    });
  });

  describe('deleteReview', () => {
    it('successfully deletes a review and its comments and votes', async () => {
      (deleteSubcollection as jest.MockedFunction<typeof deleteSubcollection>).mockResolvedValueOnce(true).mockResolvedValueOnce(true);
      (deleteDoc as jest.MockedFunction<typeof deleteDoc>).mockResolvedValueOnce(undefined);

      const result = await deleteReview(reviewId);

      expect(result).toBe(true);
      expect(deleteSubcollection).toHaveBeenCalledTimes(2);
      expect(deleteDoc).toHaveBeenCalledWith(doc(firestore, 'reviews', reviewId));
    });

    it('returns false when deleteSubcollection for comments fails', async () => {
      (deleteSubcollection as jest.MockedFunction<typeof deleteSubcollection>).mockRejectedValueOnce(new Error('Failed to delete comments'));

      const result = await deleteReview(reviewId);

      expect(result).toBe(false);
    });

    it('returns false when deleteSubcollection for votes fails', async () => {
      (deleteSubcollection as jest.MockedFunction<typeof deleteSubcollection>).mockResolvedValueOnce(true).mockRejectedValueOnce(new Error('Failed to delete votes'));

      const result = await deleteReview(reviewId);

      expect(result).toBe(false);
    });

    it('returns false when deleteDoc fails', async () => {
      (deleteSubcollection as jest.MockedFunction<typeof deleteSubcollection>).mockResolvedValueOnce(true).mockResolvedValueOnce(true);
      (deleteDoc as jest.MockedFunction<typeof deleteDoc>).mockRejectedValueOnce(new Error('Failed to delete review'));

      const result = await deleteReview(reviewId);

      expect(result).toBe(false);
    });

    it('returns false when deleteSubcollection for comments returns false', async () => {
      (deleteSubcollection as jest.MockedFunction<typeof deleteSubcollection>)
          .mockResolvedValueOnce(false) // Simulate failure in deleting comments
          .mockResolvedValueOnce(true); // Simulate success in deleting votes

      const result = await deleteReview(reviewId);

      expect(result).toBe(false);
    });

    it('returns false when deleteSubcollection for votes returns false', async () => {
      (deleteSubcollection as jest.MockedFunction<typeof deleteSubcollection>)
          .mockResolvedValueOnce(true) // Simulate success in deleting comments
          .mockResolvedValueOnce(false); // Simulate failure in deleting votes

      const result = await deleteReview(reviewId);

      expect(result).toBe(false);
    });

    it('returns false when both deleteSubcollection for comments and votes return false', async () => {
      (deleteSubcollection as jest.MockedFunction<typeof deleteSubcollection>)
          .mockResolvedValueOnce(false) // Simulate failure in deleting comments
          .mockResolvedValueOnce(false); // Simulate failure in deleting votes

      const result = await deleteReview(reviewId);

      expect(result).toBe(false);
    });
  });

  describe('updateReviewNumReports', () => {
    const reviewId = 'review1';
    const amountIncrement = 1;

    it('successfully increments the number of reports for a review', async () => {
      (updateDoc as jest.MockedFunction<typeof updateDoc>).mockResolvedValueOnce(undefined);

      const result = await updateReviewNumReports(reviewId, amountIncrement);

      expect(result).toBe(true);
      expect(updateDoc).toHaveBeenCalledWith(doc(firestore, 'reviews', reviewId), {
        numReports: increment(amountIncrement),
      });
    });

    it('returns false when updateDoc fails', async () => {
      (updateDoc as jest.MockedFunction<typeof updateDoc>).mockRejectedValueOnce(new Error('Failed to update document'));

      const result = await updateReviewNumReports(reviewId, amountIncrement);

      expect(result).toBe(false);
    });
  });
});
