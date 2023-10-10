export interface ReviewInput {
    courseId: string;
    professorId: string;
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
}