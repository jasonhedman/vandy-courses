export interface VoteInput {
    userId: string;
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