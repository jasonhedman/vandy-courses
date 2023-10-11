import {CourseId} from "@/types/Course";
import {ProfessorId} from "@/types/Professor";

export type ReviewId = string;

export interface ReviewInput {
    courseId: CourseId;
    professorId: ProfessorId;
    userId: string;
    title: string;
    content: string;
    rating: number;
    difficulty: number;
}

export interface Review extends ReviewInput {
    id: ReviewId;
    score: number;
}