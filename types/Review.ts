import {Professor} from "@/types/Professor";

import {Moment} from "moment";

// input for creating a review
export interface ReviewInput {
    courseId: string;
    professor: Professor;
    userId: string;
    title: string;
    content: string;
    rating: number;
    difficulty: number;
    skippability: number;
    takeHomeExams: boolean;
    sleepScore: number;
    effortForA: number;
    chatGptability: number;
    profChillScore: number;
}

// full review data
export interface Review extends ReviewInput {
    id: string;
    score: number;
    createdAt: Moment;
}