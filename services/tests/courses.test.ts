import { Course } from "@/types/Course"; // Make sure this path is correct
import { setCourse, updateCourseNumReviews } from "../courses"; // Adjust the path as necessary
import { doc, setDoc, updateDoc, increment } from "@firebase/firestore";

jest.mock("@firebase/firestore", () => ({
  doc: jest.fn(),
  setDoc: jest.fn(),
  updateDoc: jest.fn(),
  increment: jest.fn(),
}));

jest.mock("@/firebase/firestore", () => ({
  firestore: {}
}));

const COURSES_COLLECTION = "courses";

describe('Firestore Course Operations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should add a course document and return true on success', async () => {
    const mockCourse: Course = {
      id: "1",
      name: "Test Course",
      numReviews: 0,
      description: "A description of the Test Course"
    };
    (setDoc as jest.Mock).mockResolvedValueOnce(undefined);

    const result = await setCourse(mockCourse);

    expect(result).toBeTruthy();
    expect(doc).toHaveBeenCalledWith(expect.anything(), COURSES_COLLECTION, mockCourse.id);
    expect(setDoc).toHaveBeenCalledWith(expect.anything(), mockCourse);
  });

  it('should return false when adding a course document fails', async () => {
    const mockCourse: Course = {
      id: "1",
      name: "Test Course",
      numReviews: 0,
      description: "A description of the Test Course"
    };
    (setDoc as jest.Mock).mockRejectedValueOnce(new Error("Failed to add doc"));

    const result = await setCourse(mockCourse);

    expect(result).toBeFalsy();
  });

  it('should increment numReviews and return true on success', async () => {
    const courseId = "1";
    const amountIncrement = 1;
    (updateDoc as jest.Mock).mockResolvedValueOnce(undefined);

    const result = await updateCourseNumReviews(courseId, amountIncrement);

    expect(result).toBeTruthy();
    expect(doc).toHaveBeenCalledWith(expect.anything(), COURSES_COLLECTION, courseId);
    expect(updateDoc).toHaveBeenCalledWith(expect.anything(), {
      numReviews: increment(amountIncrement)
    });
    expect(increment).toHaveBeenCalledWith(amountIncrement);
  });

  it('should return false when incrementing numReviews fails', async () => {
    const courseId = "1";
    const amountIncrement = 1;
    (updateDoc as jest.Mock).mockRejectedValueOnce(new Error("Failed to update doc"));

    const result = await updateCourseNumReviews(courseId, amountIncrement);

    expect(result).toBeFalsy();
  });
});
