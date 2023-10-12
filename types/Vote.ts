export interface VoteInput {
    userId: string;
    reviewId: string;
    voteStatus: VoteStatus;
}

export interface Vote extends VoteInput {
    id: string;
}

export enum VoteStatus {
    NONE,
    UPVOTED,
    DOWNVOTED
}