export interface ReviewInput {
    courseId: string;
    professorId: string;
    userId: string;
    title: string;
    content: string;
    rating: number;
    difficulty: number;
}

export interface Review extends ReviewInput {
    id: string;
    score: number;
}