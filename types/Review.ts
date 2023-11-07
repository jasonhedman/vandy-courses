import {Professor} from "@/types/Professor";
import { Report } from "@/types/Report";

import {Moment} from "moment";

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

export interface Review extends ReviewInput {
    id: string;
    score: number;
    createdAt: Moment;
    numReports: number;
}