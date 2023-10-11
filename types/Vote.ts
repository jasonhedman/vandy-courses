export interface Vote {
    id: string;
    userId: string;
    reviewId: string;
    isUpvote: boolean;
}

export enum VoteStatus {
    NONE,
    UPVOTED,
    DOWNVOTED
}