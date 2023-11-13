import { jest } from '@jest/globals';
import { ReviewInput, VoteStatus } from "@/types/Vote";
import { addReview, voteReview, deleteReview } from "../reviews"; 
import { updateCourseNumReviews } from "../courses";
import { deleteSubcollection } from "../firebaseUtils";
import { addDoc, updateDoc, deleteDoc, increment, doc } from "@firebase/firestore";

jest.mock('@firebase/firestore', () => ({
  addDoc: jest.fn(),
  collection: jest.fn(),
  deleteDoc: jest.fn(),
  doc: jest.fn(),
  increment: jest.fn(),
  updateDoc: jest.fn(),
}));

jest.mock('@/firebase/firestore', () => ({
  firestore: {}
}));

jest.mock('@/firebase/firestore/collections', () => ({
  COMMENTS_COLLECTION: 'comments',
  REVIEWS_COLLECTION: 'reviews',
  VOTES_COLLECTION: 'votes',
}));

jest.mock('@/services/courses', () => ({
  updateCourseNumReviews: jest.fn(),
}));

jest.mock('@/services/firebaseUtils', () => ({
  deleteSubcollection: jest.fn(),
}));

describe("Review Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should add a review and return true on successful creation", async () => {
    const mockReviewInput: ReviewInput = {
      courseId: "course1",
      content: "Great course!",
      professor: "professorId",
      userId: "userId",
      title: "Review Title",
      rating: 5,
      // Add other required properties with mock values
      // ...
    };

    const mockNewDocRef = { id: "newReviewId" };

    (addDoc as jest.Mock).mockResolvedValue(mockNewDocRef);
    (updateDoc as jest.Mock).mockResolvedValue(undefined);
    (updateCourseNumReviews as jest.Mock).mockResolvedValue(true);

    const result = await addReview(mockReviewInput);

    expect(result).toBeTruthy();
    expect(addDoc).toHaveBeenCalled();
    expect(updateDoc).toHaveBeenCalledWith(expect.anything(), { id: mockNewDocRef.id });
    expect(updateCourseNumReviews).toHaveBeenCalledWith(mockReviewInput.courseId, 1);
  });

  it("should return false when the review creation fails", async () => {
    const mockReviewInput: ReviewInput = {
      courseId: "course2",
      content: "Needs improvement.",
      professor: "professorId",
      userId: "userId",
      title: "Review Title",
      rating: 3,
    };

    (addDoc as jest.Mock).mockRejectedValue(new Error("Failed to add document"));

    const result = await addReview(mockReviewInput);

    expect(result).toBeFalsy();
    expect(addDoc).toHaveBeenCalled();
  });

  it("should increment the review score and return true on success", async () => {
    const reviewId = "review1";
    const amountIncrement = 1;

    (updateDoc as jest.Mock).mockResolvedValue(undefined);
    (increment as jest.Mock).mockReturnValue("incremented value");

    const result = await voteReview(reviewId, amountIncrement);

    expect(result).toBeTruthy();
    expect(updateDoc).toHaveBeenCalledWith(expect.anything(), { score: "incremented value" });
    expect(increment).toHaveBeenCalledWith(amountIncrement);
  });

  it("should return false when the review score increment fails", async () => {
    const reviewId = "review2";
    const amountIncrement = -1;

    (updateDoc as jest.Mock).mockRejectedValue(new Error("Failed to update document"));

    const result = await voteReview(reviewId, amountIncrement);

    expect(result).toBeFalsy();
  });

  it("should delete the review and associated subcollections and return true on success", async () => {
    const reviewId = "review1";

    (deleteSubcollection as jest.Mock).mockResolvedValue(undefined);
    (deleteDoc as jest.Mock).mockResolvedValue(undefined);

    const result = await deleteReview(reviewId);

    expect(result).toBeTruthy();
    expect(deleteSubcollection).toHaveBeenCalledWith("reviews", reviewId, "comments");
    expect(deleteSubcollection).toHaveBeenCalledWith("reviews", reviewId, "votes");
    expect(deleteDoc).toHaveBeenCalledWith(expect.anything());
  });

  it("should return false when the review deletion fails", async () => {
    const reviewId = "review3";

    (deleteSubcollection as jest.Mock).mockRejectedValue(new Error("Failed to delete subcollection"));

    const result = await deleteReview(reviewId);

    expect(result).toBeFalsy();
  });
});

