import {Moment} from "moment";

// input for creating a comment
export interface CommentInput {
    reviewId: string;
    content: string;
    userId: string;
}

// full comment data
export interface Comment extends CommentInput {
    id: string;
    score: number;
    createdAt: Moment;
}